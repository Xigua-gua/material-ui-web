/**
 * @desc react-router-redux及history配置
 **/

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import * as reducers from './reducers'


export default function configureStore(history, initialState) {
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  })
  // const loggerMiddleware = createLogger()
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware,
        routerMiddleware(history),
      ),
    ),
  )
  return store
}
