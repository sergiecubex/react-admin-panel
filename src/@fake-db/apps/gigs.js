import mock from '../mock'
import { paginateArray, sortCompare } from '../utils'

const data = {
  gigs: [
    {
      _id: "60f7dbab54d5041330325b13",
      searchTags: [
          "copy writing",
          "data entry",
          "article rewriter"
      ],
      title: "I will copywriters and content writers",
      longDescription: "<p style=\"margin: 0px; padding: 0px; border: 0px; outline: 0px; font-size: 16px; vertical-align: baseline; background: 0px 0px #ffffff; color: #62646a; font-family: Macan, 'Helvetica Neue', Helvetica, Arial, sans-serif;\"><span style=\"margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; background: 0px 0px; font-weight: bold;\">Hi, Welcome to my GIG:</span></p>\n<p style=\"margin: 0px; padding: 0px; border: 0px; outline: 0px; font-size: 16px; vertical-align: baseline; background: 0px 0px #ffffff; color: #62646a; font-family: Macan, 'Helvetica Neue', Helvetica, Arial, sans-serif;\">Do you want to take your blog writing and articles writing to next level?</p>\n<p style=\"margin: 0px; padding: 0px; border: 0px; outline: 0px; font-size: 16px; vertical-align: baseline; background: 0px 0px #ffffff; color: #62646a; font-family: Macan, 'Helvetica Neue', Helvetica, Arial, sans-serif;\">&nbsp;</p>\n<p style=\"margin: 0px; padding: 0px; border: 0px; outline: 0px; font-size: 16px; vertical-align: baseline; background: 0px 0px #ffffff; color: #62646a; font-family: Macan, 'Helvetica Neue', Helvetica, Arial, sans-serif;\">Then you have come to the right place</p>\n<p style=\"margin: 0px; padding: 0px; border: 0px; outline: 0px; font-size: 16px; vertical-align: baseline; background: 0px 0px #ffffff; color: #62646a; font-family: Macan, 'Helvetica Neue', Helvetica, Arial, sans-serif;\"><span style=\"margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; background: 0px 0px; font-weight: bold;\">&nbsp;Welcome</span></p>\n<p style=\"margin: 0px; padding: 0px; border: 0px; outline: 0px; font-size: 16px; vertical-align: baseline; background: 0px 0px #ffffff; color: #62646a; font-family: Macan, 'Helvetica Neue', Helvetica, Arial, sans-serif;\">&nbsp;</p>\n<p style=\"margin: 0px; padding: 0px; border: 0px; outline: 0px; font-size: 16px; vertical-align: baseline; background: 0px 0px #ffffff; color: #62646a; font-family: Macan, 'Helvetica Neue', Helvetica, Arial, sans-serif;\"><span style=\"margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; background: 0px 0px; font-weight: bold;\">My&nbsp;Services:</span></p>\n<p style=\"margin: 0px; padding: 0px; border: 0px; outline: 0px; font-size: 16px; vertical-align: baseline; background: 0px 0px #ffffff; color: #62646a; font-family: Macan, 'Helvetica Neue', Helvetica, Arial, sans-serif;\">&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Article writing / rewriting</p>\n<p style=\"margin: 0px; padding: 0px; border: 0px; outline: 0px; font-size: 16px; vertical-align: baseline; background: 0px 0px #ffffff; color: #62646a; font-family: Macan, 'Helvetica Neue', Helvetica, Arial, sans-serif;\">&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Blog writing</p>",
      main_category: "Writers",
      parent_subcategory: "Marketing",
      child_subcategory: "Social Media Copy",
      userId: {
          _id: "60e3dd758d813079c62af84a",
          userType: "user",
          signUpMethod: "email",
          active: true,
          languages: [],
          email: "hello@web-ai.ru",
          createdDate: "2021-07-05T12:12:23.044Z",
          updatedDate: "2021-07-21T09:39:08.489Z",
          salt: "fa955e17c7a63c15163899f33245179b731db83b302ca1cade73de09288eef60",
          hash: "cf55cd41b9e72c7245551487831a38fa9dd998fed91f44c0692aaf1125045e66fc46fbf87adc53327b68519eb7c813323532713735b106fe2edd823e91e71cdcbbc74e679cecd56930e6c2b0b31451d3944cbe462f02dfd8e5bd9ae64ad8e9a4ed993058817e1da104449f6d6829d7fe84425399059730e1a0b3362fe2ad8d921e30619cabf1ca0157b2627a67325fcc130401be64548d15f2b3d787acb6d5c40ddc35a781fea713efcbb6a45a2b28268c0488b4dfbfbd11cd3b07c1a95365f8dc1005e0f9d0ec424ec166beac8264e61755c56d2aac23252557b37bfdb567b6422846c98a698da02ffb04b4413fd7b2bba5a907afb0a967037b9f07c5bb70cbf919b7eb280ffd6e3ec2886ad640c9d6e0e2cb62bfb450b14d24c7f107c6475d57032692c69d92f69e9cc8e2f7b4c959608b53c2368e6b940a86414980552131a280f3c67400b2b07c60157ad523e8ecdf395fd8e08b620757a6fd3fe324c23c4fdabd6919e15156803fd2e3f849188521cd1cdb36ebeb516a178552feb0aaf5eccd9103f6aa1149ccb6125a9c6e4cba12403625c5e9d8dbb743a6338bb4e4802d842751149d78e1ab9754b77fc808e4bdfb79d80463de45f09e8a65dc8f123e793bdc69d289f6c9896d8dfc976ca506ac55124c8cf35f28297c21ae13b02df4da89009df747d8b9ba28b4dabcac3fbdf40a9387f10bd6439faaad922d71e2e6",
        __: 0,
        avatar: {
          _id: "60f7eb0afeb3cd2cd2efb74b",
          name: "image-b3fe6f48-bce9-4eef-a3b9-199937cd38de.jpg",
          originalname: "beard-1845166_1920.jpg",
          type: "image/jpeg",
          url: "images/image-b3fe6f48-bce9-4eef-a3b9-199937cd38de.jpg",
          date: "021-07-21T09:38:18.467Z"
        },
        firstname: "Jacobe",
        lastname: "Smith"
      },
      gigPackages: [
        {
          price: 1700,
          priceCurrency: "USD",
          _id: "60f7e575feb3cd2cd2efb70f",
          title: "Basic ",
          description: "I will write professional content & article as your requirement of (500 words)",
          revisions: 1,
          turnAroundTimeInDays: 3
        },
        {
          price: 3100,
          priceCurrency: "USD",
          _id: "60f7e575feb3cd2cd2efb710",
          title: "Standard",
          description: "I will write article as your requirement with, Great for SEO web content 1000 words",
          revisions: 2,
          turnAroundTimeInDays: 21
        },
        {
          price: 4400,
          priceCurrency: "USD",
          _id: "60f7e575feb3cd2cd2efb711",
          title: "Premium",
          description: "I will write Great for SEO web content, Crafted for your success 1500 words",
          revisions: 3,
          turnAroundTimeInDays: 30
        }
      ],
      gallery: [
        {
          _id: "60f7e76ffeb3cd2cd2efb728",
          name: "gallery-0a370891-353f-48fd-a714-fd561e44b77c.jpg",
          originalname: "copywriters-and-content-writers.jpg",
          type: "image/jpeg",
          url: "images/gallery-0a370891-353f-48fd-a714-fd561e44b77c.jpg",
          date: "2021-07-21T09:22:55.479Z"
        }
      ],
      additionalFeatures: [],
      faqs: [
        {
          _id: "60f7e674feb3cd2cd2efb726",
          question: "Will you do SEO research of my website and then write according to the needs?",
          answer: "Yes, I will do SEO research of your site if you want and then I will write accordingly."
        }
      ],
      requirements: [
        {
          _id: "60f7e73dfeb3cd2cd2efb727",
          requirement: "I can write on any given topic that's my plus point as I can cover almost all the topics."
        }
      ],
      __v: 13,
      isComplete: true,
      isShortlisted: false
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
        gig.description.toLowerCase().includes(queryLowered)) && ((gig.isShortlisted === true && status === 'isInWaitlist') || (gig.approved === true && status === 'approved') || status === '')
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

  const productIndex = data.gigs.findIndex(p => p._id === productId)
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

  const productIndex = data.gigs.findIndex(p => p._id === productId)
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
  const gigIndex = data.gigs.findIndex(p => p._id === gig._id)
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
