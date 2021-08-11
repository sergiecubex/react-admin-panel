import mock from '../mock'
/* eslint-disable */
import { paginateArray, sortCompare, randomDate, getRandomInt } from '../utils'

const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
const nextWeek = new Date(nextDay.getTime() + 7 * 24 * 60 * 60 * 1000)

const data = {
  users: [
    {
      _id:{$oid:"60dc33b51fea467d12b9c218"},
      userType:"user",
      signUpMethod:"email",
      emailVerified:false,
      active:true,  //suspended
      languages:[],
      email:"devops@web-ai.studio",
      createdDate:{$date:{$numberLong:"1625043893884"}}, //created
      updatedDate:{$date:{$numberLong:"1625043893884"}},
      salt:"768b2680d782608db49adfeef7a13c582bdadb5bb9038b37d78199ff5cb6cb3d",hash:"7138d733906810c56101e845ea6c0038084f18e40bfe7757b8ab02d8f0a311451d3f21a8f8b34e2633b0cb95969b87e63f3d0fb99b252c5df97ae9db061ced46195813d26164a5c7ad8acc513d6de2f7a7b1eb030a83736eb311590a75344d07bf4fd4dcd38f70e1ea3fbe8d497db5fd64e08ae3ff8dffd439bed2758e37c7b7ffab9971a8d0ee06e9f022d7f79fdbd825a0d36d823dfe9d34bb4ef040238df5eac0983690340c2b6c9059b11c3fbf66d5d636765412cca39e69ee7999b5ef43c156ad72a65545a1d3a9922382a5c43a870b3cde75b24fbf1258df902e72ca339f5f942b7742f2fa3fbab1ef73b2b4298d10ad85deb70df025e59e73f3597dcc8221521350793611df697e5ea370b0e4055dbbe9cacbf94d81f0b769dfb68758b9cbdcf6a92a629e7a396a0776f71b4d88259f5e3d82036b04b998b05beee7683ac8bd0ae4a733f988f50ec0bf840f8a993efc5f7ae436160cfdcbb8451082658aadc7c9ddf531f3e8655b4dd0ee74ccbc6cd1c4e2ebacaa543f39029213d91ca2b2f02ce05e4d903fb7c97ef625771ac566f1661607b997e6dd21a3c1e1c47aca34c2827f04d3dc3c4c02639bea5d52a05956cb2416472cbe09c97902d67cc8bfea4beb02b09570ae69e24d4815fe80825826ae3affe8c238cafae7a439ffced595a8c8c90486a2baf96243012ccc32e490a301ea3eed3b22da37231e61bfb8",
      __v:{"$numberInt":"0"}
    },
    {
      _id:{$oid:"60de363181dbf62828ce03be"},
      userType:"user",
      signUpMethod:"email",
      emailVerified:false,
      active:false,  //suspended
      languages:[],
      email:"test@web-ai.studio",
      createdDate:{$date:{$numberLong:"1625043893884"}}, //created
      updatedDate:{$date:{$numberLong:"1625043893884"}},
      salt:"768b2680d782608db49adfeef7a13c582bdadb5bb9038b37d78199ff5cb6cb3d",hash:"7138d733906810c56101e845ea6c0038084f18e40bfe7757b8ab02d8f0a311451d3f21a8f8b34e2633b0cb95969b87e63f3d0fb99b252c5df97ae9db061ced46195813d26164a5c7ad8acc513d6de2f7a7b1eb030a83736eb311590a75344d07bf4fd4dcd38f70e1ea3fbe8d497db5fd64e08ae3ff8dffd439bed2758e37c7b7ffab9971a8d0ee06e9f022d7f79fdbd825a0d36d823dfe9d34bb4ef040238df5eac0983690340c2b6c9059b11c3fbf66d5d636765412cca39e69ee7999b5ef43c156ad72a65545a1d3a9922382a5c43a870b3cde75b24fbf1258df902e72ca339f5f942b7742f2fa3fbab1ef73b2b4298d10ad85deb70df025e59e73f3597dcc8221521350793611df697e5ea370b0e4055dbbe9cacbf94d81f0b769dfb68758b9cbdcf6a92a629e7a396a0776f71b4d88259f5e3d82036b04b998b05beee7683ac8bd0ae4a733f988f50ec0bf840f8a993efc5f7ae436160cfdcbb8451082658aadc7c9ddf531f3e8655b4dd0ee74ccbc6cd1c4e2ebacaa543f39029213d91ca2b2f02ce05e4d903fb7c97ef625771ac566f1661607b997e6dd21a3c1e1c47aca34c2827f04d3dc3c4c02639bea5d52a05956cb2416472cbe09c97902d67cc8bfea4beb02b09570ae69e24d4815fe80825826ae3affe8c238cafae7a439ffced595a8c8c90486a2baf96243012ccc32e490a301ea3eed3b22da37231e61bfb8",
      __v:{"$numberInt":"0"}
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

  const userIndex = data.users.findIndex(user => user._id.$oid === userId)
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
  const userIndex = data.users.findIndex(p => p.id === user.id)
  //replace user in db
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

  const userIndex = data.users.findIndex(user => user.id === userId)
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