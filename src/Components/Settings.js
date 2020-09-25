import ListErrors from './ListErrors';
import React from 'react';
import AuthActions from '../Stores/Auth/Actions';
import CommonActions from '../Stores/Common/Actions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types'

class SettingsForm extends React.Component {
  constructor() {
    super();
    this.state = {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    };
    this.updateState = field => ev => {
      const newState = Object.assign({}, this.state, { [field]: ev.target.value });
      this.setState(newState);
    };
    this.submitForm = ev => {
      ev.preventDefault();
      const user = Object.assign({}, this.state);
      if (!user.password) {
        delete user.password;
      }
      this.props.onSubmitForm(user);
    };
  }

  componentDidMount() {
    if (this.props.currentUser) {
      Object.assign(this.state, {
        image: this.props.currentUser.image || '',
        username: this.props.currentUser.username  || '',
        bio: this.props.currentUser.bio  || '',
        email: this.props.currentUser.email || ''
      });
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.currentUser) {
      Object.assign(this.state, {
        image: nextProps.currentUser.image || '',
        username: nextProps.currentUser.username  || '',
        bio: nextProps.currentUser.bio  || '',
        email: nextProps.currentUser.email || ''
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <fieldset>

          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="URL of profile picture"
              value={this.state.image}
              onChange={this.updateState('image')} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.updateState('username')} />
          </fieldset>

          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows="8"
              placeholder="Short bio about you"
              value={this.state.bio}
              onChange={this.updateState('bio')}>
            </textarea>
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.updateState('email')} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="New Password"
              value={this.state.password}
              onChange={this.updateState('password')} />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={this.state.inProgress}>
            Update Settings
          </button>

        </fieldset>
      </form>
    );
  }
}
SettingsForm.propTypes = {
  currentUser: PropTypes.object,
  onSubmitForm: PropTypes.func, 
}
class Settings extends React.Component {
  render() {
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">

              <h1 className="text-xs-center">Your Settings</h1>

              <ListErrors errors={this.props.errors}></ListErrors>

              <SettingsForm
                currentUser={this.props.currentUser}
                onSubmitForm={this.props.onSubmitForm} />

              <hr />

              <button
                className="btn btn-outline-danger"
                onClick={this.props.onClickLogout}>
                Or click here to logout.
              </button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
Settings.propTypes = {
  currentUser: PropTypes.object,
  errors: PropTypes.array,
  onSubmitForm: PropTypes.func,
  onClickLogout: PropTypes.func,
  onUnload: PropTypes.func, 
}
const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch(AuthActions.logout()),
  onSubmitForm: user =>
    dispatch(AuthActions.save(user)),
  onUnload: () => dispatch(CommonActions.pageUnloaded())
});
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
