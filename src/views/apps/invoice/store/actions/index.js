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
// ** Get data
export const getData = params => {
  return dispatch => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/transaction/all`, params).then(response => {
      const { perPage = 10, page, status = null } = params
      const queryLowered = params.q.toLowerCase()
      const filteredData = response?.data
      .filter(
        invoice =>
          /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
        invoice?.userId?.email?.includes(queryLowered)
      )
      .sort(sortCompare('date'))
      .reverse()
    /* eslint-enable  */
      dispatch({
        type: 'GET_DATA',
        allData: response.data,
        data: paginateArray(filteredData, perPage, page),
        totalPages: response.data / 10,
        params
      })
    })
  }
}

// ** Get intended payouts
export const getIntendedPayouts = params => {
  return dispatch => {
    axios.get('/apps/sales/intended', params).then(response => {
      dispatch({
        type: 'GET_DATA',
        allData: response.data.allData,
        data: response.data.invoices,
        totalPages: response.data.total,
        params
      })
    })
  }
}

// ** Delete Invoice
export const deleteInvoice = id => {
  return (dispatch, getStore) => {
    axios
      .delete('/apps/invoice/delete', { id })
      .then(response => {
        dispatch({
          type: 'DELETE_INVOICE'
        })
      })
      .then(() => dispatch(getData(getStore().invoice.params)))
  }
}
