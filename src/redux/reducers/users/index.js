const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  userDetail: {}
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        ...state,
        allData: action.allData,
        data: action.data,
        total: action.data / 10,
        params: action.params
      }
    case 'GET_USER':
      return { ...state, userDetail: action.data }
    case 'DELETE_USER':
      return { ...state }
    default:
      return { ...state }
  }
}
export default userReducer
