import axios from 'axios'

// ** GET GIG
export const getGig = id => {
  return dispatch => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/gigs/all/${id}`).then(res => {
      console.log(res.data)
      dispatch({ type: 'GET_GIG', data: res.data })
    })
  }
}

// ** UPDATE GIG
export const saveGig = (id, item) => {
  return dispatch => {
    return axios.patch(`${process.env.REACT_APP_BASE_URL}/gigs/all/${id}`, {item}).then((req, res) => {
      dispatch({ type: 'SAVE_GIG_ITEM', data: item})
    })
  }
}

// ** DELETE GIG
export const deleteGig = id => {
  return dispatch => {
    return axios.delete(`${process.env.REACT_APP_BASE_URL}/gigs/all/${id}`).then(res => {
      dispatch({ type: 'DELETE_GIG_ITEM', data: res.data })
    })
  }
}

// ** GET User
export const getUser = id => {
  return dispatch => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/users/all/${id}`).then(res => {
      dispatch({ type: 'GET_USER', data: res.data })
    })
  }
}

// ** UPDATE User
export const saveUser = (id, user) => {
  return dispatch => {
    return axios.patch(`${process.env.REACT_APP_BASE_URL}/users/all/${id}`, {user}).then(() => {
      dispatch({ type: 'SAVE_USER', data: user})
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
