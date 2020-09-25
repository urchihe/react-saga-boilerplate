import Banner from './Banner';
import MainView from './MainView';
import React from 'react';
import Tags from './Tags';
import ArticleActions from '../../Stores/Article/Actions';
import TagActions from '../../Stores/Tag/Actions';
import CommonActions from '../../Stores/Common/Actions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types'

const Promise = global.Promise;

class Home extends React.Component {
  componentWillMount() {
    this.tab = this.props.token ? 'feed' : 'all';
    const articlesPromise = this.props.token ? this.props.loadFeed: this.props.loadArticles
      Promise.all([this.props.loadTags(), articlesPromise()]);
  }

  componentDidUpdate() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="home-page">

        <Banner token={this.props.token} appName={this.props.appName} />

        <div className="container page">
          <div className="row">
            <MainView tab={this.tab}/>

            <div className="col-md-3">
              <div className="sidebar">

                <p>Popular Tags</p>

                <Tags
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag} />

              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
Home.propTypes = {
  tags: PropTypes.array,
  token: PropTypes.string,
  appName: PropTypes.string,
  onClickTag: PropTypes.func,
  onLoad: PropTypes.func,
  onUnload: PropTypes.func,
  loadTags: PropTypes.func,
  loadFeed: PropTypes.func,
}
const mapStateToProps = state => ({
  ...state.auth,
  appName: state.common.appName,
  tags: state.tag.tags
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager) =>
    dispatch(ArticleActions.getArticles(pager, tag)),
  loadArticles: (pager) =>
    dispatch(ArticleActions.getArticles(pager)),
  loadFeed: (pager) =>
    dispatch(ArticleActions.getFeed(pager)),
  loadTags: () =>
    dispatch(TagActions.getTags()),
  onUnload: () =>
    dispatch(CommonActions.pageUnloaded())
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
