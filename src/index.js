import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import createStore from './Stores'
import { Route, Switch,Router } from 'react-router-dom';
//import { ConnectedRouter } from 'react-router-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import * as serviceWorker from './serviceWorker';
import App from './Components/App';
//import { history }  from './Stores/createStore'
const { store, persistor,history} = createStore()

ReactDOM.render((
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </PersistGate>
  </Provider>

), document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
