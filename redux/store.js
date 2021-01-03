import { createStore, compose } from 'redux'
import rootReducer from './reducers/root'

const composeEnhancers = global?.window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(rootReducer, {}, composeEnhancers())