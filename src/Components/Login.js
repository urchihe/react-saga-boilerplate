import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import AuthActions from '../Stores/Auth/Actions';
import CommonActions from '../Stores/Common/Actions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email || '';
    const password = this.props.password || '';
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <Link to="/register">
                  Need an account?
                </Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(email, password)}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={this.changeEmail} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.changePassword} />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Sign in
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
Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  inProgress: PropTypes.bool,
  onSubmit: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onUnload: PropTypes.func, 
}

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch(AuthActions.updateFieldAuth({key: 'email', value })),
  onChangePassword: value =>
    dispatch(AuthActions.updateFieldAuth({key: 'password', value })),
  onSubmit: (email, password) => dispatch(AuthActions.login(email, password)),
  onUnload: () =>
    dispatch(CommonActions.pageUnloaded())
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
