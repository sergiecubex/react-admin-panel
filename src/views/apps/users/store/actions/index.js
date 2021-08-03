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


// ** DELETE GIG
export const deleteGig = id => {
  return dispatch => {
    return axios.delete(`/apps/users/${id}`).then(res => {
      console.log(res)
      dispatch({ type: 'DELETE_USER', data: res.data })
    })
  }
}
