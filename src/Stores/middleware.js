import AuthActions from './Auth/Actions';

const promiseMiddleware = store => next => action => {
  if (isPromise(action)) {
    store.dispatch(AuthActions.asyncStart());

    const currentView = store.getState().common.viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState().common.currentUser
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('RESULT', res);
        action.payload = res;
        store.dispatch(AuthActions.asyncEnd());
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState().common
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('ERROR', error);
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
  if (store.getState().auth.loginIsLoading || store.getState().auth.registerIsLoading) {
    if (!action.error) {
      console.log(action)
      window.localStorage.setItem('jwt', action.payload.user.token);
      AuthActions.setToken(action.payload.user.token);
    }
  } else if (store.getState().auth.logoutIsLoading) {
    window.localStorage.setItem('jwt', '');
    AuthActions.setToken(null);
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}


export { promiseMiddleware, localStorageMiddleware }
