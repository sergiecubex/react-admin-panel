const initialState = {
  products: [],
  wishlist: [],
  cart: [],
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
    case 'GET_WISHLIST':
      return { ...state, wishlist: action.data.products }
    case 'DELETE_WISHLIST_ITEM':
      return { ...state }
    // case 'GET_CART':
    //   return { ...state, cart: action.data.products }
    // case 'DELETE_CART_ITEM':
    //   return { ...state }
    case 'ADD_TO_WISHLIST':
      return { ...state }
    // case 'ADD_TO_CART':
    //   return { ...state }
    case 'GET_PRODUCT':
      return { ...state, productDetail: action.data.product }
    case 'GET_DATA':
      return {
        ...state,
        allData: action.allData,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_USER':
      return { ...state, userDetail: action.data.user }
    default:
      return state
  }
}

export default ecommerceReducer
