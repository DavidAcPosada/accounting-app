import { SET_ESTABLISHMENTS } from '../types/establishments'

const initialState = []

const establishments = (state = initialState, action) => {
  switch (action.type) {
    case SET_ESTABLISHMENTS:
      return [
        ...action.payload
      ]
    default: return [...state]
  }
}

export default establishments