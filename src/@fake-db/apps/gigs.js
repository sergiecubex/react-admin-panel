import mock from '../mock'
import { paginateArray, sortCompare } from '../utils'

const data = {
  gigs: [
    { 
      id: 1, 
      title: 'I will copywriters and content writers',
      image: "https://hwdev.web-ai.studio/api/images/gallery-0a370891-353f-48fd-a714-fd561e44b77c.jpg",
      description: 'Hi, Welcome to my GIG: Do you want to take your blog writing and articles writing to next level? Then you have come to the right place My Services: Article writing / rewriting Blog writing',
      category: ['Writers', 'Marketing', 'Social Media'],
      searchTags: ['copywriting', 'data entry', 'article rewriter'],
      price: 27,
      turnAroundTimeInDays: 4,
      approved: false,
      waitlisted: false
    },
    { 
      id: 2, 
      title: 'I will copywriters and content writers',
      image: "https://hwdev.web-ai.studio/api/images/gallery-87bae388-611b-42b2-a8a0-f5b8bff40d2a.jpg",
      description: 'Hi, Welcome to my GIG: Do you want to take your blog writing and articles writing to next level? Then you have come to the right place My Services: Article writing / rewriting Blog writing',
      category: ['Writers', 'Marketing', 'Social Media'],
      searchTags: ['copywriting', 'data entry', 'article rewriter'],
      price: 43,
      turnAroundTimeInDays: 6, 
      approved: false,
      waitlisted: false
    },
    { 
      id: 3, 
      title: 'I will copywriters and content writers',
      image: "https://hwdev.web-ai.studio/api/images/gallery-87bae388-611b-42b2-a8a0-f5b8bff40d2a.jpg",
      description: 'Hi, Welcome to my GIG: Do you want to take your blog writing and articles writing to next level? Then you have come to the right place My Services: Article writing / rewriting Blog writing',
      category: ['Writers', 'Marketing', 'Social Media'],
      searchTags: ['copywriting', 'data entry', 'article rewriter'],
      price: 65,
      turnAroundTimeInDays: 14,
      approved: false,
      waitlisted: false
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
      waitlisted: false
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
mock.onGet(/\/apps\/gigs\/\d+/).reply(config => {
  // Get product id from URL
  let productId = config.url.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  productId = Number(productId)

  const productIndex = data.gigs.findIndex(p => p.id === productId)
  const product = data.gigs[productIndex]

  if (product) {

    // * Add Dummy data for details page
    product.colorOptions = ['primary', 'success', 'warning', 'danger', 'info']

    return [200, { product }]
  }
  return [404]
})

// ------------------------------------------------
// DELETE: Remove Item from DB
// ------------------------------------------------
mock.onDelete(/\/apps\/gigs\/\d+/).reply(config => {
  // Get product id from URL
  let productId = config.url.substring(config.url.lastIndexOf('/') + 1)
  // Convert Id to number
  productId = Number(productId)

  const productIndex = data.gigs.findIndex(i => i.id === productId)
  console.log("Index:", productIndex, "ID:", productId)
  if (productIndex > -1) data.gigs.splice(productIndex, 1)

  return [200]
})

// ------------------------------------------------
// GET: Return Clients
// ------------------------------------------------
mock.onGet('/api/invoice/clients').reply(() => {
  const clients = data.invoices.map(invoice => invoice.client)
  return [200, clients.slice(0, 5)]
})
