import { Profile, mapStateToProps } from './Profile';
import React from 'react';
import { Link } from 'react-router-dom';
import ArticleActions from '../Stores/Article/Actions';
import ProfileActions from '../Stores/Profile/Actions';
import CommonActions from '../Stores/Common/Actions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types'

class ProfileFavorites extends Profile {
  componentWillMount() {
    this.props.onLoad(page => this.props.onGetArticleFavoritedBy(this.props.match.params.username, page), Promise.all([
      this.props.onGetProfile(this.props.match.params.username),
      this.props.onGetArticleFavoritedBy(this.props.match.params.username)
    ]));
  }

  componentWillUnmount() {
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
  onLoad: (pager, payload) =>
    dispatch(ProfileActions.profilePageLoaded({ pager, payload })),
  onGetProfile: (username) =>
    dispatch(ProfileActions.getProfile(username)),
  onGetArticleFavoritedBy: (author,page) =>
    dispatch(ArticleActions.getArticleFavoritedBy(author,page)),
  onUnload: () =>
    dispatch(CommonActions.pageUnloaded()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);
