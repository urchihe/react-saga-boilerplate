import ArticleList from '../ArticleList';
import React from 'react';
import ArticleActions from '../../Stores/Article/Actions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types'

const YourFeedTab = (props) => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick('feed', ArticleActions.getFeed, ArticleActions.getFeed());
    }

    return (
      <li className="nav-item">
        <a  href={"null"}
            className={ props.tab === 'feed' ? 'nav-link active' : 'nav-link' }
            onClick={clickHandler}>
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

YourFeedTab.propTypes = {
  token: PropTypes.string,
  tab: PropTypes.string,
  onTabClick: PropTypes.func,
}

const GlobalFeedTab = (props) => {
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick('all', ArticleActions.getArticles, ArticleActions.getArticles());
  };
  return (
    <li className="nav-item">
      <a
        href={"null"}
        className={ props.tab === 'all' ? 'nav-link active' : 'nav-link' }
        onClick={clickHandler}>
        Global Feed
      </a>
    </li>
  );
};

GlobalFeedTab.propTypes = {
  tab: PropTypes.string,
  onTabClick: PropTypes.func,
}

const TagFilterTab = (props) => {
  if (!props.tag) {
    return null;
  }
  return (
    <li className="nav-item">
      <a href={"null"} className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </a>
    </li>
  );
};

TagFilterTab.propTypes = {
  tab: PropTypes.string,
}

const MainView = (props) => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

          <YourFeedTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick} />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

          <TagFilterTab tag={props.tag} />

        </ul>
      </div>

      <ArticleList
        pager={props.pager}
        articles={props.articles}
        loading={props.loading}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage} />
    </div>
  );
};

MainView.propTypes = {
  articles: PropTypes.array,
  tags: PropTypes.array,
  tab: PropTypes.string,
  loading: PropTypes.bool,
  articlesCount: PropTypes.number,
  token: PropTypes.string,
  currentPage: PropTypes.number,
  pager: PropTypes.number,
  onTabClick: PropTypes.func,
  loadArticles: PropTypes.func,
}

const mapStateToProps = state => ({
  ...state.article,
  tags: state.tag.tags,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch(ArticleActions.changeTabs(tab, pager, payload )),
  loadArticles: (pager) =>
  dispatch(ArticleActions.getArticles(pager)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
