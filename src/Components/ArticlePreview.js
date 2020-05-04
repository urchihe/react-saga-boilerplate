import React from 'react';
import { Link } from 'react-router-dom';
import ArticleActions from '../Stores/Article/Actions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types'

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const ArticlePreview = (props) => {
  const article = props.article;
  const favouriteButtonClass = article.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (article.favorited) {
      props.unfavorite(article.slug);
    } else {
      props.favorite(article.slug);
    }
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/@${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>

        <div className="info">
          <Link className="author" to={`/@${article.author.username}`}>
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favouriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {article.favouritesCount}
          </button>
        </div>
      </div>

      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {
            article.tagList.map(tag => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>
      </Link>
    </div>
  );
}
ArticlePreview.propTypes = {
  article: PropTypes.object,
  favorite: PropTypes.func,
  unfavorite: PropTypes.func,
}
const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch(ArticleActions.setFavouriteArticle(slug)),
  unfavorite: slug => dispatch(ArticleActions.unfavouriteArticle(slug))
});
export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);
