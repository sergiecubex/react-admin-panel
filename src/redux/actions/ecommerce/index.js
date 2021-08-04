import axios from 'axios'

// ** GET Products
export const getProducts = params => {
  return dispatch => {
    return axios.get('/apps/gigs-management/gigs', { params }).then(res => {
      dispatch({ type: 'GET_PRODUCTS', data: res.data, params })
    })
  }
}

// ** GET Single Product
export const getProduct = slug => {
  return dispatch => {
    return axios.get(`/apps/gigs-management/gigs/${id}`).then(res => {
      dispatch({ type: 'GET_PRODUCT', data: res.data })
    })
  }
}

// ** DELETE Item from BD
export const deleteGig = id => {
  return dispatch => {
    return axios.delete(`/apps/gigs-management/gigs/${id}`).then(res => {
      dispatch({ type: 'DELETE_GIG_ITEM', data: res.data })
      dispatch(getProducts())
    })
  }
}

// ** GET Wishlist Items
export const getWishlistItems = () => {
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


export const getUser = params => {
  return dispatch => {
    return axios.get('/apps/users', { params }).then(res => {
      dispatch({ type: 'GET_USER', data: res.data, params })
    })
  }
}