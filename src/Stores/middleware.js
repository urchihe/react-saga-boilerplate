import AuthActions from './Auth/Actions';
import { push } from 'react-router-redux';

const promiseMiddleware = store => next => action => {
  if (isPromise(action)) {
    store.dispatch(AuthActions.asyncStart());

    const currentView = store.getState().common.viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState().auth.currentUser
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        action.payload = res;
        store.dispatch(AuthActions.asyncEnd());
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState().common
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        action.error = true;
        action.payload = error.response.body;
        if (!action.skipTracking) {
          store.dispatch(AuthActions.asyncEnd());
        }
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {
  if (action.type === 'LOGIN_SUCCESS' || action.type === 'REGISTER_SUCCESS') {
    if (action.payload) {
      window.localStorage.setItem('jwt', action.payload.user.token);
      AuthActions.setToken(action.payload.user.token);
    }
  } else if (action.type === 'LOGOUT_SUCCESS') {
    window.localStorage.setItem('jwt', '');
    AuthActions.setToken(null);
  }  else if (action.type === 'FAVOURITE_ARTICLE_ERROR' && !action.payload) {
    store.dispatch(push('/login'))
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}


export { promiseMiddleware, localStorageMiddleware }
