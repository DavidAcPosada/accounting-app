import { combineReducers } from 'redux'

import establishments from './establishments'
import ui from './ui'

export default combineReducers({
  establishments,
  ui
})