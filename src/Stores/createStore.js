import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistReducer, persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { createBrowserHistory } from 'history'
import { promiseMiddleware, localStorageMiddleware } from './middleware'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import storage from 'redux-persist/lib/storage';

const history = createBrowserHistory();
// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: []
}

export default (rootReducer, rootSaga) => {
  const middleware = []
  const enhancers = []

  // Connect the sagas to the redux store
  const sagaMiddleware = createSagaMiddleware()

  middleware.push(sagaMiddleware)
  
  const logger = createLogger()
  const getMiddleware = () => {
    if (process.env.NODE_ENV === 'production') {
      return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware, ...middleware);
    } else {
      // Enable additional logging in non-production environments.
      return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware, ...middleware, logger)
    }
  };

  enhancers.push(getMiddleware())

  // Redux persist
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  // Redux debbugger
const composeEnhancers = composeWithDevTools({})

  const store = createStore(persistedReducer, composeEnhancers(...enhancers))
  const persistor = persistStore(store)

  // Kick off the root saga
  sagaMiddleware.run(rootSaga)

  return { store, persistor, history}
}