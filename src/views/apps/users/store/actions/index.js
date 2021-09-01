import axios from 'axios'

const paginateArray = (array, perPage, page) => array.slice((page - 1) * perPage, page * perPage)

const sortCompare = key => (a, b) => {
  const fieldA = a[key]
  const fieldB = b[key]

  let comparison = 0
  if (fieldA > fieldB) {
    comparison = 1
  } else if (fieldA < fieldB) {
    comparison = -1
  }
  return comparison
}

// ** Get Gigs
export const getData = params => {
  return dispatch => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/users/all`, params).then(response => {
      const { perPage = 10, page, status = null } = params
      const queryLowered = params.q.toLowerCase()
      const filteredData = response?.data
      .filter(
        user =>
          /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
        (user?.email?.includes(queryLowered) && ((user?.isSuspended === true && status === 'suspended') || status === ''))
      )
      .sort(sortCompare('createdDate'))
      .reverse()
    /* eslint-enable  */
    console.log(filteredData)
      dispatch({
        type: 'GET_DATA',
        allData: response.data,
        data: paginateArray(filteredData, perPage, page),
        totalPages: response.data.length / 10,
        params
      })
    })
  }
}

// ** DELETE User
export const deleteUser = id => {
  return dispatch => {
    return axios.delete(`${process.env.REACT_APP_BASE_URL}/users/all/${id}`).then(res => {
      dispatch({ type: 'DELETE_USER', data: res.data })
    })
  }
}

// ** UPDATE User
export const saveUser = (id, user) => {
  return dispatch => {
    return axios.patch(`${process.env.REACT_APP_BASE_URL}/users/all/${id}`).then(() => {
      dispatch({ type: 'SAVE_USER', data: user})
    })
  }
}