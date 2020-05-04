import AuthActions from '../Stores/Auth/Actions';
import Header from './Header';
import React from 'react';
import { connect } from 'react-redux';
import CommonActions from '../Stores/Common/Actions';
import { Route, Switch } from 'react-router-dom';
import Article from '../Components/Article';
import Editor from '../Components/Editor';
import Home from '../Components/Home';
import Login from '../Components/Login';
import Profile from '../Components/Profile';
import ProfileFavorites from '../Components/ProfileFavorites';
import Register from '../Components/Register';
import Settings from '../Components/Settings';
import { push } from 'react-router-redux';
import { PropTypes } from 'prop-types'
import createStore from '../Stores'
const { store } = createStore()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {} 
  }
  componentDidUpdate(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentDidMount(){
    const token = window.localStorage.getItem('jwt');
    if (token) {
      this.props.setToken(token);
    }
    this.props.onGetCurrentUser()
    this.props.onLoad(token ? store.getState().auth.currentUser : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser} />
            <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/editor/:slug" component={Editor} />
            <Route path="/editor" component={Editor} />
            <Route path="/article/:id" component={Article} />
            <Route path="/settings" component={Settings} />
            <Route path="/@:username/favorites" component={ProfileFavorites} />
            <Route path="/@:username" component={Profile} />
            </Switch>
        </div>
      );
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
      </div>
    );
  }
}
App.propTypes = {
  appLoaded: PropTypes.bool,
  appName: PropTypes.string,
  currentUser: PropTypes.object,
  redirectTo: PropTypes.string,
  onLoad: PropTypes.func,
  onRedirect: PropTypes.func,
  setToken: PropTypes.func,
  onGetCurrentUser: PropTypes.func,
}
const mapStateToProps = (state) => ({
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  });

const mapDispatchToProps = (dispatch) => ({
  onLoad: (user, token) =>
    dispatch(CommonActions.appLoad(user, token, true)),
  onRedirect: () =>
    dispatch(CommonActions.redirect()),
  setToken: (token) => dispatch(AuthActions.setToken(token)),
  onGetCurrentUser: () => dispatch(AuthActions.getCurrentUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
