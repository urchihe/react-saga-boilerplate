import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types'


const LoggedOutView = props => {
  if ((Object.keys(props.currentUser).length  === 0)) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Sign in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign up
          </Link>
        </li>

      </ul>
    );
  }
  return null;
};
LoggedOutView.propTypes = {
  currentUser: PropTypes.object
}

const LoggedInView = props => {
  if (!(Object.keys(props.currentUser).length  === 0)) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/editor" className="nav-link">
            <i className="ion-compose"></i>&nbsp;New Post
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`/@${props.currentUser.username}`}
            className="nav-link">
            <img src={props.currentUser.image} className="user-pic" alt={props.currentUser.image} />
            {props.currentUser.username}
          </Link>
        </li>

      </ul>
    );
  }

  return null;
};
LoggedInView.propTypes = {
  currentUser: PropTypes.object
}
class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">

          <Link to="/" className="navbar-brand">
            {this.props.appName.toLowerCase()}
          </Link>

          <LoggedOutView currentUser={this.props.currentUser} />

          <LoggedInView currentUser={this.props.currentUser} />
        </div>
      </nav>
    );
  }
}
Header.propTypes = {
  currentUser: PropTypes.object,
  appName: PropTypes.string,
}

export default Header;
