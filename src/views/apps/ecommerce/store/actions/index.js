import axios from 'axios'

// ** GET Products
export const getProducts = params => {
  return dispatch => {
    return axios.get('/apps/gigs-management/gigs', { params }).then(res => {
      dispatch({ type: 'GET_PRODUCTS', data: res.data, params })
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

// ** Add Item to Cart
export const addToCart = id => {
  return (dispatch, getState) => {
    return axios.post('/apps/ecommerce/cart', { productId: id }).then(res => {
      dispatch({ type: 'ADD_TO_CART', data: res.data })
      dispatch(getProducts(getState().ecommerce.params))
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

// ** DELETE Wishlist Item
export const deleteWishlistItem = id => {
  return dispatch => {
    return axios.delete(`/apps/gigs-management/featured/${id}`).then(res => {
      dispatch({ type: 'DELETE_WISHLIST_ITEM', data: res.data })
      dispatch(getWishlistItems())
    })
  }
}

// ** GET Cart Items
export const getCartItems = () => {
  return dispatch => {
    return axios.get('/apps/ecommerce/cart').then(res => {
      dispatch({ type: 'GET_CART', data: res.data })
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

// ** Add Item to Wishlist
export const addToWishlist = id => {
  return dispatch => {
    return axios.post('/apps/gigs-management/featured', { productId: id }).then(() => {
      dispatch({ type: 'ADD_TO_WISHLIST' })
    })
  }
}

// ** DELETE Cart Items
export const deleteCartItem = id => {
  return dispatch => {
    return axios.delete(`/apps/ecommerce/cart/${id}`).then(res => {
      dispatch({ type: 'DELETE_CART_ITEM', data: res.data })
      dispatch(getCartItems())
    })
  }
}
