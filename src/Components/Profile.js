import ArticleList from './ArticleList';
import React from 'react';
import { Link } from 'react-router-dom';
import CommonActions from '../Stores/Common/Actions';
import ProfileActions from '../Stores/Profile/Actions';
import ArticleActions from '../Stores/Article/Actions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types'

const EditProfileSettings = (props) => {
  if (props.isUser) {
    return (
      <Link
        to="/settings"
        className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a"></i> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

EditProfileSettings.propTypes = {
  isUser: PropTypes.bool
}
const FollowUserButton = props => {
  if (props.isUser) {
    return null;
  }

  let classes = 'btn btn-sm action-btn';
  if (props.user.following) {
    classes += ' btn-secondary';
  } else {
    classes += ' btn-outline-secondary';
  }

  const handleClick = ev => {
    ev.preventDefault();
    if (props.user.following) {
      props.unfollow(props.user.username)
    } else {
      props.follow(props.user.username)
    }
  };

  return (
    <button
      className={classes}
      onClick={handleClick}>
      <i className="ion-plus-round"></i>
      &nbsp;
      {props.user.following ? 'Unfollow' : 'Follow'} {props.user.username}
    </button>
  );
};
FollowUserButton.propTypes = {
  isUser: PropTypes.bool,
  user: PropTypes.object,
  unfollow: PropTypes.func,
  follow: PropTypes.func,
}

class Profile extends React.Component {
  componentDidMount() {
    this.props.onLoad(this.props.match.params.username, this.props.pager)
  }

  componentDidUpdate(nextProps){
    if(nextProps.profile.profile){
      this.props.profile.following = nextProps.profile.following
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`/@${this.props.profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/@${this.props.profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    const profile = this.props.profile;
    if (!profile) {
      return null;
    }

    const isUser = this.props.currentUser &&
      this.props.profile.username === this.props.currentUser.username;

    return (
      <div className="profile-page">

        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">

                <img src={profile.image} className="user-img" alt={profile.username} />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>

                <EditProfileSettings isUser={isUser} />
                <FollowUserButton
                  isUser={isUser}
                  user={profile}
                  follow={this.props.follow}
                  unfollow={this.props.unfollow}
                  />

              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">

              <div className="articles-toggle">
                {this.renderTabs()}
              </div>

              <ArticleList
                pager={this.props.pager}
                articles={this.props.articles}
                articlesCount={this.props.articlesCount}
                currentPage={this.props.currentPage} />
            </div>

          </div>
        </div>

      </div>
    );
  }
}
Profile.propTypes = {
  email: PropTypes.array,
  password: PropTypes.object,
  inProgress: PropTypes.bool,
  profile: PropTypes.object,
  onSubmit: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onUnload: PropTypes.func, 
}
const mapStateToProps = state => ({
  ...state.article,
  ...state.profile,
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  follow: username => dispatch(ProfileActions.followUser(username)),
  onLoad: (username, pager) => { 
    dispatch(ProfileActions.profilePageLoaded(username)) 
    dispatch(ProfileActions.getProfile(username))
    dispatch(ArticleActions.getArticlesByAuthor(username, pager))
  },
  unfollow: username => dispatch(ProfileActions.unfollowUser(username)),
  onUnload: () => dispatch(CommonActions.pageUnloaded())
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };
