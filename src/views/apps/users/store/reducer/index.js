const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {}
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
    case 'DELETE_USER':
      return { ...state }
    case 'SAVE_USER':
      return { ...state }
    default:
      return { ...state }
  }
}
export default userReducer
