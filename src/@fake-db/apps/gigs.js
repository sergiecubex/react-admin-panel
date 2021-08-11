import mock from '../mock'
import { paginateArray, sortCompare } from '../utils'

const data = {
  gigs: [
    {
      _id:{$oid:"60f694289c92a8648cb5b611"},
      searchTags:["Blog", "Business", "Education "],
      title:"I will build a modern website for authors, writers with ecommerce",
      longDescription:"<p style=\"margin: 0px; padding: 0px; border: 0px; outline: 0px; font-size: 16px; vertical-align: baseline; background: 0px 0px #ffffff; color: #62646a; font-family: Macan, 'Helvetica Neue', Helvetica, Arial, sans-serif;\">Design and web development is my passion and I've been doing it for the last 6 years - first as a hobby and then as a full-time job.&nbsp;This is the right Gig for you if you need an&nbsp;exceptional&nbsp;&amp;&nbsp;clean<span style=\"margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; background: 0px 0px; font-weight: bold;\">&nbsp;<span style=\"background: #ffecd1;\">website for authors&nbsp;</span></span><span style=\"background: #ffecd1;\">or</span><span style=\"margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; background: 0px 0px; font-weight: bold;\"><span style=\"background: #ffecd1;\">&nbsp;writers</span></span>!</p>",
      main_category:"Designers", // category
      parent_subcategory:"Visual Design", // subcategory
      child_subcategory:"Photoshop Editing",
      userId:{$oid:"60de363181dbf62828ce03be"},
      gigPackages:[
        {
          price:{$numberInt:"100"},  // price
          priceCurrency:"USD",
          _id:{$oid:"60f695709c92a8648cb5b6b1"},
          title:"Basic package #1",
          description:"TESTs in this project",
          revisions:{$numberInt:"3"},
          turnAroundTimeInDays:{$numberInt:"3"}  // turnAroundTimeInDays
      } 
      ],
      gallery:[  //image
        {
          _id:{$oid:"60f695809c92a8648cb5b6be"}, 
          name:"gallery-9e721aa4-8679-4b0d-99cb-fbb162574d28.png",
          originalname:"presentation for sales-manager.png",
          type:"image/png",
          url:"images/gallery-9e721aa4-8679-4b0d-99cb-fbb162574d28.png",
          date:{$date:{$numberLong:"1626772864624"}}
        }
      ],
      additionalFeatures:[],
      faqs:[],
      requirements:[],
      __v:{$numberInt:"9"},
      isComplete:false,
      approved: false, //we don't have 
      isInWaitlist: false, // it in 
      created: 1385814763 // database
    }
  ]
}

// ------------------------------------------------
// GET: Return Gig List
// ------------------------------------------------
mock.onGet('/apps/gigs').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1, status = null } = config
  const queryLowered = q.toLowerCase()
  const filteredData = data.gigs
    .filter(
      gig =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
        (gig.title.toLowerCase().includes(queryLowered) ||
        gig.description.toLowerCase().includes(queryLowered)) && ((gig.isInWaitlist === true && status === 'isInWaitlist') || (gig.approved === true && status === 'approved') || status === '')
    )
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
  
  // const stringId = String(productId)
  // const numberId = Number(productId)

  const productIndex = data.gigs.findIndex(p => p._id.$oid === productId)
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
  console.log(gig)
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
