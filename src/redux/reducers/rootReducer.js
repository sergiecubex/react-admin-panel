// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import ecommerce from './ecommerce'
import invoice from './invoice'
import users from './users'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  ecommerce,
  invoice,
  users
})

export default rootReducer
