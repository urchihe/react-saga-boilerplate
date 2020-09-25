import Comment from './Comment';
import React from 'react';
import { PropTypes } from 'prop-types'

const CommentList = (props) => {
  if(props.comments.length > 0){
  return (
      <div>
      {
        props.comments.map(comment => {
          return (
            <Comment
              comment={comment}
              currentUser={props.currentUser}
              slug={props.slug}
              key={comment.id} />
          );
        })
      }
    </div>
    
  );
}else{
  return <div></div>
}
};
CommentList.propTypes = {
  comments: PropTypes.object,
  currentUser: PropTypes.object,
  slug: PropTypes.string
}
export default CommentList;
