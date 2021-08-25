const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  productDetail: {}
}

const GigReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_GIGS':
      return {
        ...state,
        allData: action.allData,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'DELETE_GIG_ITEM':
      return { ...state }
    default:
      return { ...state }
  }
}
export default GigReducer
