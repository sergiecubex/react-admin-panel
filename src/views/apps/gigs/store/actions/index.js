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

export const getGigs = params => {
  return dispatch => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/gigs/all`, params).then(response => {
      const { perPage = 10, page, status = null } = params
      const queryLowered = params.q.toLowerCase()
      const filteredData = response?.data
      .filter(
        gig =>
          /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
        (gig?.title?.includes(queryLowered) && ((gig?.isApproved === true && status === 'approved') || status === ''))
      )
      .sort(sortCompare('createdDate'))
      .reverse()
    /* eslint-enable  */
    console.log(filteredData)
      dispatch({
        type: 'GET_GIGS',
        allData: response.data,
        data: paginateArray(filteredData, perPage, page),
        totalPages: response.data.length / 10,
        params
      })
    })
  }
}

// ** DELETE GIG
export const deleteGig = id => {
  return dispatch => {
    return axios.delete(`${process.env.REACT_APP_BASE_URL}/gigs/all/${id}`).then(res => {
      dispatch({ type: 'DELETE_GIG_ITEM', data: res.data })
    })
  }
}

// ** UPDATE GIG
export const saveGig = (id, item) => {
  return dispatch => {
    return axios.patch(`${process.env.REACT_APP_BASE_URL}/gigs/all/${id}`, {item}).then((req, res) => {
      dispatch({ type: 'SAVE_GIG_ITEM', data: item})
    })
  }
}
