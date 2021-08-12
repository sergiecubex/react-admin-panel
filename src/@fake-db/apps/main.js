import mock from '../mock'
/* eslint-disable */
import { paginateArray, sortCompare, randomDate, getRandomInt } from '../utils'

const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
const nextWeek = new Date(nextDay.getTime() + 7 * 24 * 60 * 60 * 1000)

const data = {
  users: [
    {
      userType: "user",
      signUpMethod: "email",
      emailVerified: false,
      active: true,
      languages: ["English", "Spanish"],
      balance: 174,
      _id: "60e3dd758d813079c62af84a",
      email: "hennyp9066@gmail.com",
      createdDate: "2021-07-06T04:35:01.988Z",
      updatedDate: "2021-07-07T07:30:57.077Z",
      __v: 2,
      firstname: "test",
      lastname: "user555",
      freelancerProfile: {
          portfolioURLList: [],
          _id: "60e5537cd643be40c1e92227",
          skills: [],
          education: []
      },
      workHistory: {
          _id: "60e5557ed643be40c1e92245",
          employment: [],
          certifications: []
      },
      timeZone: 1,
      avatar: {
          _id: "60f80a4a90b1bb63cd644ad6",
          date: "2021-07-21T11:51:38.537Z",
          name: "image-7c594660-c406-4df5-9379-e9168f8b4c06.png",
          originalname: "translation_category.png",
          type: "image/png",
          url: "images/image-7c594660-c406-4df5-9379-e9168f8b4c06.png"
      }
    }
  ]
}
/* eslint-enable */

// ------------------------------------------------
// GET: Return User's List
// ------------------------------------------------
mock.onGet('/apps/users').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1, status = null } = config
  /* eslint-enable */
  const queryLowered = q.toLowerCase()
  const filteredData = data.users
    .filter(
      user =>
        /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
        (user.email.toLowerCase().includes(queryLowered) && ((user.active === true && status === 'suspended') || status === ''))
    )
    .sort(sortCompare('created'))
    .reverse()
  /* eslint-enable  */
  return [
    200,
    {
      allData: data.users,
      users: paginateArray(filteredData, perPage, page),
      total: filteredData.length
    }
  ]
})

// ------------------------------------------------
// GET: Return Single User
// ------------------------------------------------
mock.onGet(/\/apps\/user-details\/?.*/).reply(config => {
  // Get user id from URL
  const userId = config.url.substring(config.url.lastIndexOf('/') + 1)
  // Convert Id to number
  // userId = Number(userId)

  const userIndex = data.users.findIndex(user => user._id === userId)
  const user = data.users[userIndex]
  console.log(user)
  if (user) {
    // * Add Dummy data for details page
    user.colorOptions = ['primary', 'success', 'warning', 'danger', 'info']

    return [200, { user }]
  }
  return [404]
})

// ------------------------------------------------
// SAVE: Save User in DB
// ------------------------------------------------
mock.onPost(/\/apps\/users\/?.*/).reply(config => {
  //extract data from config
  const user = JSON.parse(config.data)
  //find index of extracted gig
  const userIndex = data.users.findIndex(p => p._id === user._id)
  //replace user in db
  console.log(userIndex)
  data.users.splice(userIndex, 1)
  data.users.push(user)

  return [201]
})

// ------------------------------------------------
// DELETE: Remove User from DB
// ------------------------------------------------
mock.onDelete(/\/apps\/users\/?.*/).reply(config => {
  // Get product id from URL
  const userId = config.url.substring(config.url.lastIndexOf('/') + 1)

  const userIndex = data.users.findIndex(user => user._id === userId)
  console.log("Index:", userIndex, "ID:", userId)
  if (userIndex > -1) data.users.splice(userIndex, 1)

  return [200]
})

//OLD PRODUCTS CODE

// ------------------------------------------------
// GET: Return products
// ------------------------------------------------
// mock.onGet('/apps/gigs').reply(config => {
//   // eslint-disable-next-line object-curly-newline
//   const { q = '', sortBy = 'featured', perPage = 9, page = 1 } = config.params

//   const queryLowered = q.toLowerCase()

//   const filteredData = data.gigs.filter(product => product.title.toLowerCase().includes(queryLowered))

//   let sortDesc = false
//   const sortByKey = (() => {
//     if (sortBy === 'price-desc') {
//       sortDesc = true
//       return 'price'
//     }
//     if (sortBy === 'price-asc') {
//       return 'price'
//     }
//     sortDesc = true
//     return 'id'
//   })()

//   const sortedData = filteredData.sort(sortCompare(sortByKey))
//   if (sortDesc) sortedData.reverse()

//   const paginatedData = JSON.parse(JSON.stringify(paginateArray(sortedData, perPage, page)))

//   paginatedData.forEach(product => {
//     /* eslint-disable no-param-reassign */
//     product.isInWishlist = data.userWishlist.findIndex(p => p.productId === product.id) > -1
//     product.isInCart = data.userCart.findIndex(p => p.productId === product.id) > -1
//     /* eslint-enable */
//   })
  
//   // const fetchGigs = async () => {
//   //   const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/gigs`)
//   //   const response = await res.json()
//   //   const textResponse = await re.text()
//   //   console.log(await response)
//   //   console.log(await textResponse)
//   // }
//   // fetchGigs()

//   return [
//     200,
//     {
//       products: paginatedData,
//       total: filteredData.length,
//       userWishlist: data.userWishlist,
//       userCart: data.userCart
//     }
//   ]
// })
  
// ------------------------------------------------
// GET: Return Single Product
// ------------------------------------------------
// mock.onGet(/\/apps\/gigs\/?.*/).reply(config => {
//   // Get product id from URL
//   const productId = config.url.substring(config.url.lastIndexOf('/') + 1)
//   console.log(productId)
//   // Convert Id to number
//   const numbertId = Number(productId)

//   const productIndex = data.gigs.findIndex(p => p.id === productId || p.id === numbertId)
  
//   const product = data.gigs[productIndex]

//   if (product) {
//     // Add data of wishlist and cart
//     product.isInWishlist = data.userWishlist.findIndex(p => p.productId === product.id) > -1

//     // * Add Dummy data for details page
//     product.colorOptions = ['primary', 'success', 'warning', 'danger', 'info']

//     return [200, { product }]
//   }
//   return [404]
// })


// ------------------------------------------------
// DELETE: Remove Item from DB
// ------------------------------------------------
// mock.onDelete(/\/apps\/gigs-management\/gigs\/?.*/).reply(config => {
//   // Get product id from URL
//   const productId = config.url.substring(config.url.lastIndexOf('/') + 1)
//   // Convert Id to number
//   // productId = Number(productId)

//   const productIndex = data.gigs.findIndex(i => i.id === productId)
//   console.log("Index:", productIndex, "ID:", productId)
//   if (productIndex > -1) data.gigs.splice(productIndex, 1)

//   return [200]
// })