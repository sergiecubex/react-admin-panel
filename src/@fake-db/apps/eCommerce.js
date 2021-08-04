import mock from '../mock'
/* eslint-disable */
import { paginateArray, sortCompare, randomDate, getRandomInt } from '../utils'

const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
const nextWeek = new Date(nextDay.getTime() + 7 * 24 * 60 * 60 * 1000)

const data = {
  users: [
    { 
      id: '13sf24', 
      name: 'Author',
      email: 'author@example.com'
    },
    { 
      id: '25fe346', 
      name: 'Drawer',
      email: 'drawer@example.com'

    },
    { 
      id: '33geg46', 
      name: 'Painter',
      email: 'painter@example.com'
    },
    { 
      id: '44ge474',
      name: 'Freelancer',
      email: 'freelancer@example.com'
    }
  ],
  gigs: [
    { 
      id: 1, 
      title: 'I will copywriters and content writers',
      image: "https://hwdev.web-ai.studio/api/images/gallery-0a370891-353f-48fd-a714-fd561e44b77c.jpg",
      description: 'Hi, Welcome to my GIG: Do you want to take your blog writing and articles writing to next level? Then you have come to the right place My Services: Article writing / rewriting Blog writing',
      category: ['Writers', 'Marketing', 'Social Media'],
      searchTags: ['copywriting', 'data entry', 'article rewriter'],
      price: 17
    },
    { 
      id: 2, 
      title: 'I will copywriters and content writers',
      image: "https://hwdev.web-ai.studio/api/images/gallery-87bae388-611b-42b2-a8a0-f5b8bff40d2a.jpg",
      description: 'Hi, Welcome to my GIG: Do you want to take your blog writing and articles writing to next level? Then you have come to the right place My Services: Article writing / rewriting Blog writing',
      category: ['Writers', 'Marketing', 'Social Media'],
      searchTags: ['copywriting', 'data entry', 'article rewriter'],
      price: 43
    },
    { 
      id: 3, 
      title: 'I will copywriters and content writers',
      image: "https://hwdev.web-ai.studio/api/images/gallery-87bae388-611b-42b2-a8a0-f5b8bff40d2a.jpg",
      description: 'Hi, Welcome to my GIG: Do you want to take your blog writing and articles writing to next level? Then you have come to the right place My Services: Article writing / rewriting Blog writing',
      category: ['Writers', 'Marketing', 'Social Media'],
      searchTags: ['copywriting', 'data entry', 'article rewriter'],
      price: 65
    },
    { 
      id: 4,
      title: 'I will copywriters and content writers',
      image: "https://hwdev.web-ai.studio/api/images/gallery-0a370891-353f-48fd-a714-fd561e44b77c.jpg",
      description: 'Hi, Welcome to my GIG: Do you want to take your blog writing and articles writing to next level? Then you have come to the right place My Services: Article writing / rewriting Blog writing',
      category: ['Writers', 'Marketing', 'Social Media'],
      searchTags: ['copywriting', 'data entry', 'article rewriter'],
      price: 9
    },
  ],
  userWishlist: [],
  userCart: []
}
/* eslint-enable */

// ------------------------------------------------
// GET: Return User's List
// ------------------------------------------------
mock.onGet('/apps/users').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1 } = config
  /* eslint-enable */

  const filteredData = data.users
    .sort(sortCompare('id'))
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

  const userIndex = data.users.findIndex(user => user.id === userId)
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

// ------------------------------------------------
// GET: Return products
// ------------------------------------------------
mock.onGet('/apps/gigs-management/gigs').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', sortBy = 'featured', perPage = 9, page = 1 } = config.params

  const queryLowered = q.toLowerCase()

  const filteredData = data.gigs.filter(product => product.title.toLowerCase().includes(queryLowered))

  let sortDesc = false
  const sortByKey = (() => {
    if (sortBy === 'price-desc') {
      sortDesc = true
      return 'price'
    }
    if (sortBy === 'price-asc') {
      return 'price'
    }
    sortDesc = true
    return 'id'
  })()

  const sortedData = filteredData.sort(sortCompare(sortByKey))
  if (sortDesc) sortedData.reverse()

  const paginatedData = JSON.parse(JSON.stringify(paginateArray(sortedData, perPage, page)))

  paginatedData.forEach(product => {
    /* eslint-disable no-param-reassign */
    product.isInWishlist = data.userWishlist.findIndex(p => p.productId === product.id) > -1
    product.isInCart = data.userCart.findIndex(p => p.productId === product.id) > -1
    /* eslint-enable */
  })
  
  // const fetchGigs = async () => {
  //   const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/gigs`)
  //   const response = await res.json()
  //   const textResponse = await re.text()
  //   console.log(await response)
  //   console.log(await textResponse)
  // }
  // fetchGigs()

  return [
    200,
    {
      products: paginatedData,
      total: filteredData.length,
      userWishlist: data.userWishlist,
      userCart: data.userCart
    }
  ]
})

// ------------------------------------------------
// GET: Return Single Product
// ------------------------------------------------
mock.onGet(/\/apps\/gigs-management\/gigs\/?.*/).reply(config => {
  // Get product id from URL
  const productId = config.url.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  // productId = Number(productId)

  const productIndex = data.gigs.findIndex(p => p.id === productId)
  const product = data.gigs[productIndex]

  if (product) {
    // Add data of wishlist and cart
    product.isInWishlist = data.userWishlist.findIndex(p => p.productId === product.id) > -1

    // * Add Dummy data for details page
    product.colorOptions = ['primary', 'success', 'warning', 'danger', 'info']

    return [200, { product }]
  }
  return [404]
})

// ------------------------------------------------
// GET: Return Wishlist Products
// ------------------------------------------------
mock.onGet('/apps/gigs-management/featured').reply(() => {
  const products = data.userWishlist.map(wishlistProduct => {
    const product = data.gigs.find(p => p.id === wishlistProduct.productId)
    product.isInCart = data.userCart.findIndex(p => p.productId === wishlistProduct.productId) > -1
    return product
  })

  return [200, { products }]
})

// ------------------------------------------------
// POST: Add Item in user Wishlist
// ------------------------------------------------
mock.onPost('/apps/gigs-management/featured').reply(config => {
  // Get product from post data
  const { productId } = JSON.parse(config.data)

  const { length } = data.userWishlist
  let lastId = 0
  if (length) lastId = data.userWishlist[length - 1].i

  data.userWishlist.push({
    id: lastId + 1,
    productId: Number(productId)
  })

  return [201]
})

// ------------------------------------------------
// DELETE: Remove Item from user Wishlist
// ------------------------------------------------
mock.onDelete(/\/apps\/gigs-management\/featured\/?.*/).reply(config => {
  // Get product id from URL
  const productId = config.url.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  // productId = Number(productId)

  const productIndex = data.userWishlist.findIndex(i => i.productId === productId)
  if (productIndex > -1) data.userWishlist.splice(productIndex, 1)

  return [200]
})

// ------------------------------------------------
// DELETE: Remove Item from DB
// ------------------------------------------------
mock.onDelete(/\/apps\/gigs-management\/gigs\/?.*/).reply(config => {
  // Get product id from URL
  const productId = config.url.substring(config.url.lastIndexOf('/') + 1)
  // Convert Id to number
  // productId = Number(productId)

  const productIndex = data.gigs.findIndex(i => i.id === productId)
  console.log("Index:", productIndex, "ID:", productId)
  if (productIndex > -1) data.gigs.splice(productIndex, 1)

  return [200]
})