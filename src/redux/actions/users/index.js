import axios from 'axios'

// ** Get Gigs
export const getData = params => {
  return dispatch => {
    axios.get('/apps/users', params).then(response => {
      dispatch({
        type: 'GET_DATA',
        allData: response.data.allData,
        data: response.data.users,
        totalPages: response.data.total,
        params
      })
    })
  }
}

// ** GET Products
export const getUser = params => {
  return dispatch => {
    return axios.get('/apps/users', { params }).then(res => {
      dispatch({ type: 'GET_USER', data: res.data, params })
    })
  }
}