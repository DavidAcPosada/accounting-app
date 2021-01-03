import { STATUS_BUTTONS_INIT_SALE } from '../types/ui'

const initialState = {
  initSale: {
    disableControls: false
  }
}

const ui = (state = initialState, action) => {
  switch (action.type) {
    case STATUS_BUTTONS_INIT_SALE:
      return {
        ...state,
        initSale: {
          disableControls: action.payload
        }
      }
    default: return state
  }
}

export default ui