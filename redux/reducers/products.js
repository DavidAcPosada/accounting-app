import { SET_PRODUCTS } from './../types/products'

const initialState = {

}

const products = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      
      break;
  
    default: return state
  }
}