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
    axios.get(`${process.env.REACT_APP_BASE_URL}/projects/all`, params).then(response => {
      const { perPage = 10, page, status = null } = params
      const queryLowered = params.q.toLowerCase()
      const filteredData = response?.data
      .filter(
        project =>
          /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
          project?.clientId?.email?.includes(queryLowered)
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

// ** Get completed payouts
export const getCompletedPayouts = params => {
  return dispatch => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/balance/completed`, params).then(response => {
      dispatch({
        type: 'GET_DATA',
        allData: response.data,
        data: response.data,
        totalPages: response.data / 10,
        params
      })
    })
  }
}

// ** Get intended payouts
export const getIntendedPayouts = params => {
  return dispatch => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/balance/intended`, params).then(response => {
      dispatch({
        type: 'GET_DATA',
        allData: response.data,
        data: response.data,
        totalPages: response.data / 10,
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
