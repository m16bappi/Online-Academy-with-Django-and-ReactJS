import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import Reducers from './Reducers/RootReducer';

const middleware = [thunk]
const initialState = {}

const store = createStore(Reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store;
