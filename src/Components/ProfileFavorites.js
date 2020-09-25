import { Profile, mapStateToProps } from './Profile';
import React from 'react';
import { Link } from 'react-router-dom';
import ArticleActions from '../Stores/Article/Actions';
import ProfileActions from '../Stores/Profile/Actions';
import CommonActions from '../Stores/Common/Actions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types'

class ProfileFavorites extends Profile {
  componentDidMount() {
    this.props.onLoad(this.props.match.params.username)
  }

  componentDidCatch() {
    this.props.onUnload();
  }

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/@${this.props.profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`/@${this.props.profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }
}
ProfileFavorites.propTypes = {
  username: PropTypes.string,
  onLoad: PropTypes.func,
  onUnload: PropTypes.func,
  onGetProfile: PropTypes.func,
  onGetArticleFavoritedBy: PropTypes.func, 
}
const mapDispatchToProps = dispatch => ({
  onLoad: (username) => {
    dispatch(ProfileActions.getProfile(username))
    dispatch(ArticleActions.getFavouritedByArticle(username))
  },
  onUnload: () =>
    dispatch(CommonActions.pageUnloaded()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);
