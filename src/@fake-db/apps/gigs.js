import mock from '../mock'
import { paginateArray, sortCompare } from '../utils'

const data = {
  gigs: [
    { 
      id: 1, 
      title: 'I will do that',
      image: "https://hwdev.web-ai.studio/api/images/gallery-0a370891-353f-48fd-a714-fd561e44b77c.jpg",
      description: 'Hi, Welcome to my GIG: Do you want to take your blog writing and articles writing to next level? Then you have come to the right place My Services: Article writing / rewriting Blog writing',
      category: ['Writers', 'Marketing', 'Social Media'],
      searchTags: ['copywriting', 'data entry', 'article rewriter'],
      price: 27,
      turnAroundTimeInDays: 4,
      approved: false,
      isInWaitlist: false
    },
    { 
      id: 2, 
      title: 'I can do this',
      image: "https://hwdev.web-ai.studio/api/images/gallery-87bae388-611b-42b2-a8a0-f5b8bff40d2a.jpg",
      description: 'Hi, Welcome to my GIG: Do you want to take your blog writing and articles writing to next level? Then you have come to the right place My Services: Article writing / rewriting Blog writing',
      category: ['Writers', 'Marketing', 'Social Media'],
      searchTags: ['copywriting', 'data entry', 'article rewriter'],
      price: 43,
      turnAroundTimeInDays: 6, 
      approved: false,
      isInWaitlist: false
    },
    { 
      id: '3d', 
      title: 'I cannot do anything',
      image: "https://hwdev.web-ai.studio/api/images/gallery-87bae388-611b-42b2-a8a0-f5b8bff40d2a.jpg",
      description: 'Hi, Welcome to my GIG: Do you want to take your blog writing and articles writing to next level? Then you have come to the right place My Services: Article writing / rewriting Blog writing',
      category: ['Writers', 'Marketing', 'Social Media'],
      searchTags: ['copywriting', 'data entry', 'article rewriter'],
      price: 65,
      turnAroundTimeInDays: 14,
      approved: false,
      isInWaitlist: false
    },
    { 
      id: 4,
      title: 'I will copywriters and content writers',
      image: "https://hwdev.web-ai.studio/api/images/gallery-0a370891-353f-48fd-a714-fd561e44b77c.jpg",
      description: 'Hi, Welcome to my GIG: Do you want to take your blog writing and articles writing to next level? Then you have come to the right place My Services: Article writing / rewriting Blog writing',
      category: ['Writers', 'Marketing', 'Social Media'],
      searchTags: ['copywriting', 'data entry', 'article rewriter'],
      price: 9,
      turnAroundTimeInDays: 2,
      approved: false,
      isInWaitlist: true
    }
  ]
}

// ------------------------------------------------
// GET: Return Gig List
// ------------------------------------------------
mock.onGet('/apps/gigs').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1 } = config
  /* eslint-enable */

  const filteredData = data.gigs
    .sort(sortCompare('id'))
    .reverse()
  /* eslint-enable  */
  return [
    200,
    {
      allData: data.gigs,
      gigs: paginateArray(filteredData, perPage, page),
      total: filteredData.length
    }
  ]
})

// ------------------------------------------------
// GET: Return Single Gig
// ------------------------------------------------
mock.onGet(/\/apps\/gigs\/?.*/).reply(config => {
  // Get product id from URL
  const productId = config.url.substring(config.url.lastIndexOf('/') + 1)
  
  const stringId = String(productId)
  const numberId = Number(productId)
  
  console.log(productId, stringId)

  const productIndex = data.gigs.findIndex(p => p.id === numberId || p.id === stringId)
  const product = data.gigs[productIndex]

  if (product) {

    // * Add Dummy data for details page
    product.colorOptions = ['primary', 'success', 'warning', 'danger', 'info']

    return [200, { product }]
  }
  return [404]
})

// ------------------------------------------------
// DELETE: Remove Gig from DB
// ------------------------------------------------
mock.onDelete(/\/apps\/gigs\/?.*/).reply(config => {
  // Get product id from URL
  const productId = config.url.substring(config.url.lastIndexOf('/') + 1)
  
  const stringId = String(productId)
  const numberId = Number(productId)

  const productIndex = data.gigs.findIndex(p => p.id === numberId || p.id === stringId)
  console.log("Index:", productIndex, "ID:", productId)
  if (productIndex > -1) data.gigs.splice(productIndex, 1)

  return [200]
})

// ------------------------------------------------
// SAVE: Change Gig
// ------------------------------------------------
mock.onPost(/\/apps\/gigs\/?.*/).reply(config => {
  //extract data from config
  const gig = JSON.parse(config.data)
  //find index of extracted gig
  const gigIndex = data.gigs.findIndex(p => p.id === gig.id)
  //replace gig in db
  data.gigs.splice(gigIndex, 1)
  data.gigs.push(gig)

  return [201]
})
// ------------------------------------------------
// GET: Return Waitlist Products
// ------------------------------------------------
mock.onGet('/apps/gigs-management/featured').reply(() => {
  console.log("Get Waitlist Products")
  const gigs = data.gigs.map(gig => gig.isInWaitlist === true)
  console.log(gigs)
  return [200, { gigs }]
})

// ------------------------------------------------
// POST: Add Item in user Wishlist
// ------------------------------------------------
mock.onPost('/apps/gigs-management/featured').reply(config => {
  // Get product from post data
  // const { productId } = JSON.parse(config.data)

  // const { length } = data.userWishlist
  // let lastId = 0
  // if (length) lastId = data.userWishlist[length - 1].i

  // data.userWishlist.push({
  //   id: lastId + 1,
  //   productId: Number(productId)
  // })

  return [201]
})

// ------------------------------------------------
// DELETE: Remove Item from user Wishlist
// ------------------------------------------------
mock.onDelete(/\/apps\/gigs-management\/featured\/?.*/).reply(config => {
  // Get product id from URL
  const productId = config.url.substring(config.url.lastIndexOf('/') + 1)
  
  const stringId = String(productId)
  const numberId = Number(productId)

  const productIndex = data.gigs.findIndex(p => p.id === numberId || p.id === stringId)
  if (productIndex > -1) data.userWishlist.splice(productIndex, 1)

  return [200]
})
