import React from 'react'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import * as reducers from './src/reducers'

const composeEnhancers = typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const combinedReducers = combineReducers({ ...reducers })
export default ({ element }) => {
    const store = createStore(combinedReducers, undefined, composeEnhancers(applyMiddleware(thunk)))

    return <Provider store={store}>{element}</Provider>
}
