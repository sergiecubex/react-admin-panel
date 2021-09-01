import axios from 'axios'

// ** Get Gigs
export const getData = params => {
  return dispatch => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/users/all`, params).then(response => {
      console.log(response)
      dispatch({
        type: 'GET_DATA',
        // allData: response.data,
        data: response.data,
        totalPages: response.data.length / 10,
        params
      })
    })
  }
}

// ** DELETE User
export const deleteUser = id => {
  return dispatch => {
    return axios.delete(`${process.env.REACT_APP_BASE_URL}/users/all/${id}`).then(res => {
      dispatch({ type: 'DELETE_USER', data: res.data })
    })
  }
}

// ** UPDATE User
export const saveUser = (id, user) => {
  return dispatch => {
    return axios.patch(`${process.env.REACT_APP_BASE_URL}/users/all/${id}`).then(() => {
      dispatch({ type: 'SAVE_USER', data: user})
    })
  }
}