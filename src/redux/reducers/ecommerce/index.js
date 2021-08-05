const initialState = {
  products: [],
  waitlist: [],
  productDetail: {},
  userDetail: {},
  params: {},
  totalProducts: 0
}

const ecommerceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return { ...state, products: action.data.products, params: action.params, totalProducts: action.data.total }
    case 'DELETE_GIG_ITEM':
      return { ...state }
    case 'SAVE_GIG_ITEM':
      return { ...state }
    case 'GET_WISHLIST':
      return { ...state, waitlist: action.data.gigs }
    case 'DELETE_WISHLIST_ITEM':
      return { ...state }
    case 'ADD_TO_WISHLIST':
      return { ...state }
    case 'GET_PRODUCT':
      return { ...state, productDetail: action.data.product }
    case 'GET_USER':
      return { ...state, userDetail: action.data.user }
    default:
      return state
  }
}

export default ecommerceReducer
