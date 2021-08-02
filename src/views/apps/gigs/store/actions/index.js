import axios from 'axios'

// ** Get Gigs
export const getData = params => {
  return dispatch => {
    axios.get('/apps/gigs', params).then(response => {
      dispatch({
        type: 'GET_DATA',
        allData: response.data.allData,
        data: response.data.gigs,
        totalPages: response.data.total,
        params
      })
    })
  }
}


// ** Delete Gig
export const deleteData = id => {
  return (dispatch, getStore) => {
    axios
      .delete('/apps/gigs/delete', { id })
      .then(response => {
        dispatch({
          type: 'DELETE_INVOICE'
        })
      })
      .then(() => dispatch(getData(getStore().invoice.params)))
  }
}
