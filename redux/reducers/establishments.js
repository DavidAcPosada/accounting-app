import { SET_ESTABLISHMENTS, SET_ACTIVE_ESTABLISHMENT } from '../types/establishments'

const initialState = {
  active: {},
  establishments: []
}

const establishments = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_ESTABLISHMENT:
      return {
        ...state,
        active: action.payload
      }
    case SET_ESTABLISHMENTS:
      return {
        ...state,
        establishments: action.payload
      }
    default: return state
  }
}

export default establishments