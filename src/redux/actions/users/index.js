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
export const getUser = id => {
  return dispatch => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/users/all/${id}`).then(res => {
      dispatch({ type: 'GET_USER', data: res.data })
    })
  }
}