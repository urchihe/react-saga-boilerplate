import { Link } from 'react-router-dom';
import React from 'react';
import ArticleActions from '../../Stores/Article/Actions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types'

const PerformActions = (props) => {
  const article = props.article;
  const del = () => {
    props.onClickDelete(article.slug)
  };
  if (props.canModify) {
    return (
      <span>

        <Link
          to={`/editor/${article.slug}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit Article
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Article
        </button>

      </span>
    );
  }

  return (
    <span>
    </span>
  );
};
PerformActions.propTypes = {
  article: PropTypes.object,
  onClickDelete: PropTypes.func,
  canModify: PropTypes.bool,
}
const mapDispatchToProps = dispatch => ({
  onClickDelete: slug =>
    dispatch(ArticleActions.deleteArticle(slug))
});

export default connect(() => ({}), mapDispatchToProps)(PerformActions);
