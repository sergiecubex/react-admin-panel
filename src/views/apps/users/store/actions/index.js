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
