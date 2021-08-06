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
}// ** DELETE User
export const deleteUser = id => {
  return dispatch => {
    return axios.delete(`/apps/users/${id}`).then(res => {
      dispatch({ type: 'DELETE_USER', data: res.data })
    })
  }
}

// ** Change User
export const saveUser = (id, user) => {
  return dispatch => {
    return axios.post(`/apps/users/${id}`).then(() => {
      dispatch({ type: 'SAVE_USER', data: user})
    })
  }
}