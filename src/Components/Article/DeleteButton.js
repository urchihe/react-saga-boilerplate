import React from 'react';
import CommentActions from '../../Stores/Comment/Actions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types'

const DeleteButton = (props) => {
  const del = () => {
    props.onClick(props.slug, props.commentId);
  };

  if (props.show) {
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={del}></i>
      </span>
    );
  }
  return null;
};

DeleteButton.propTypes = {
  commentId: PropTypes.integer,
  show: PropTypes.bool,
  slug: PropTypes.string,
  onClick: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  onClick: (slug, commentId) =>
    dispatch(CommentActions.deleteComment(slug,commentId))
});

export default connect(() => ({}), mapDispatchToProps)(DeleteButton);
