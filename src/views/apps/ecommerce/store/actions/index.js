import axios from 'axios'

// ** GET GIGs
export const getProducts = params => {
  return dispatch => {
    return axios.get('/apps/gigs-management/gigs', { params }).then(res => {
      dispatch({ type: 'GET_PRODUCTS', data: res.data, params })
    })
  }
}
// ** GET Single GIG

export const getProduct = id => {
  return dispatch => {
    return axios.get(`/apps/gigs/${id}`).then(res => {
      dispatch({ type: 'GET_PRODUCT', data: res.data })
    })
  }
}

// ** SAVE GIG
export const saveGig = (id, item) => {
  return dispatch => {
    return axios.post(`/apps/gigs/${id}`).then((req, res) => {
      console.log(item)
      dispatch({ type: 'SAVE_GIG_ITEM', data: item})
    })
  }
}

// ** DELETE GIG
export const deleteGig = id => {
  return dispatch => {
    return axios.delete(`/apps/gigs/${id}`).then(res => {
      dispatch({ type: 'DELETE_GIG_ITEM', data: res.data })
    })
  }
}

// ** GET Wishlist Items
export const getWaitlistItems = () => {
  return dispatch => {
    return axios.get('/apps/gigs-management/featured').then(res => {
      dispatch({ type: 'GET_WISHLIST', data: res.data })
    })
  }
}

// ** Add Item to Wishlist
export const addToWishlist = id => {
  return dispatch => {
    return axios.post('/apps/gigs-management/featured', { productId: id }).then(() => {
      dispatch({ type: 'ADD_TO_WISHLIST' })
    })
  }
}

// ** DELETE Wishlist Item
export const deleteWishlistItem = id => {
  return dispatch => {
    return axios.delete(`/apps/gigs-management/featured/${id}`).then(res => {
      dispatch({ type: 'DELETE_WISHLIST_ITEM', data: res.data })
      dispatch(getWishlistItems())
    })
  }
}

// ** GET User
export const getUser = id => {
  return dispatch => {
    return axios.get(`/apps/user-details/${id}`).then(res => {
      dispatch({ type: 'GET_USER', data: res.data })
    })
  }
}

// ** DELETE User
export const deleteUser = id => {
  return dispatch => {
    return axios.delete(`/apps/users/${id}`).then(res => {
      dispatch({ type: 'DELETE_USER', data: res.data })
    })
  }
}
