const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: []
}

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
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
export default invoiceReducer
