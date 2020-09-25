import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import AuthActions from '../Stores/Auth/Actions';
import CommonActions from '../Stores/Common/Actions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.submitForm = (username, email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(username, email, password);
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">
                  Have an account?
                </Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(username, email, password)}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      value={this.props.username || ''}
                      onChange={this.changeUsername} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={this.props.email || ''}
                      onChange={this.changeEmail} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={this.props.password || ''}
                      onChange={this.changePassword} />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Sign up
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  username: PropTypes.string,
  inProgress: PropTypes.bool,
  email: PropTypes.string,
  password: PropTypes.string,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangeUsername: PropTypes.func,
  onSubmit: PropTypes.func,
  onUnload: PropTypes.func,
  errors: PropTypes.object
}

const mapStateToProps = state => ({
   ...state.auth,
   errors: state.auth.registerErrors 
  });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch(AuthActions.updateFieldAuth({ key: 'email', value })),
  onChangePassword: value =>
    dispatch(AuthActions.updateFieldAuth({ key: 'password', value })),
  onChangeUsername: value =>
    dispatch(AuthActions.updateFieldAuth({key: 'username', value })),
  onSubmit: (username, email, password) => {
    dispatch(AuthActions.register(username, email, password))
  },
  onUnload: () =>
    dispatch(CommonActions.pageUnloaded())
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
