import React from 'react';
//import TagActions from '../../Stores/Tag/Actions';
import ArticleActions from '../../Stores/Article/Actions';
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux';

const Tags = (props) => {
  const tags = props.tags;
  if (tags) {
    return (
      <div className="tag-list">
        {
          tags.map(tag => {
            const handleClick = ev => {
              ev.preventDefault();
              props.onClickTag(tag, page => props.articleTags(tag, page), props.articleTags(tag));
            };
            
            return (
              <a 
                href={"null"}
                className="tag-default tag-pill"
                key={tag}
                onClick={handleClick}
                >
                {tag}
              </a>
            );
          })
        }
      </div>
    );
  } else {
    return (
      <div>Loading Tags...</div>
    );
  }
};
Tags.propTypes = {
  tags: PropTypes.array,
  onClickTag: PropTypes.func,
}
const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager) =>
    dispatch(ArticleActions.getArticlesByTag(tag, pager)),
  articleTags: (tag, pager) =>
    dispatch(ArticleActions.getArticlesByTag(tag, pager)),
});
export default connect(() => ({}), mapDispatchToProps)(Tags);
