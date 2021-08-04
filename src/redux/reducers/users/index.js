const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  productDetail: {},
  usertDetail: {}
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        ...state,
        allData: action.allData,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_USER':
      return { ...state, usertDetail: action.data.user }
    case 'DELETE_USER':
      return { ...state }
    default:
      return { ...state }
  }
}
export default userReducer
