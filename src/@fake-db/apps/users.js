import mock from '../mock'
import { paginateArray, sortCompare } from '../utils'

const data = {
  users: [
    { 
      id: 1324, 
      name: 'Author'

    },
    { 
      id: 25346, 
      name: 'Drawer'

    },
    { 
      id: 3346, 
      name: 'Painter'

    },
    { 
      id: 44474,
      name: 'Freelancer'

    }
  ]
}

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
mock.onGet(/\/apps\/users\/\d+/).reply(config => {
  // Get product id from URL
  let userId = config.url.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  userId = Number(userId)

  const userIndex = data.users.findIndex(p => p.id === userId)
  const user = data.users[userIndex]

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
mock.onDelete(/\/apps\/users\/\d+/).reply(config => {
  // Get product id from URL
  let userId = config.url.substring(config.url.lastIndexOf('/') + 1)
  // Convert Id to number
  userId = Number(userId)

  const userIndex = data.users.findIndex(i => i.id === userId)
  console.log("Index:", userIndex, "ID:", userId)
  if (userIndex > -1) data.users.splice(userIndex, 1)

  return [200]
})

