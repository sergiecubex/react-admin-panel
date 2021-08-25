import axios from 'axios'

// ** Get Gigs
// export const getData = params => {
//   return dispatch => {
//     axios.get('/apps/gigs', params).then(response => {
//       dispatch({
//         type: 'GET_DATA',
//         allData: response.data.allData,
//         data: response.data.gigs,
//         totalPages: response.data.total,
//         params
//       })
//     })
//   }
// }

export const getGigs = params => {
  return dispatch => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/gigs/all`, params).then(response => {
      console.log(response)
      dispatch({
        type: 'GET_GIGS',
        // allData: response.data.allData,
        data: response.data,
        totalPages: response.data.length / 10,
        params
      })
    })
  }
}


// ** DELETE GIG
export const deleteGig = id => {
  return dispatch => {
    return axios.delete(`/apps/gigs/${id}`).then(res => {
      console.log(res)
      dispatch({ type: 'DELETE_GIG_ITEM', data: res.data })
    })
  }
}
