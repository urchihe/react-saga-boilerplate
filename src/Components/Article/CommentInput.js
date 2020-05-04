import React from 'react';
import CommentAtions from '../../Stores/Comment/Actions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types'

class CommentInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ''
    };

    this.setBody = ev => {
      this.setState({ body: ev.target.value });
    };

    this.createComment = ev => {
      ev.preventDefault();
      const slug = this.props.slug
      const comment  =  this.state.body;
      this.setState({ body: '' });
      this.props.onSubmit(slug,comment);
    };
  }

  render() {
    return (
      <form className="card comment-form" onSubmit={this.createComment}>
        <div className="card-block">
          <textarea className="form-control"
            placeholder="Write a comment..."
            value={this.state.body}
            onChange={this.setBody}
            rows="3">
          </textarea>
        </div>
        <div className="card-footer">
          <img
            src={this.props.currentUser.image}
            className="comment-author-img"
            alt={this.props.currentUser.username} />
          <button
            className="btn btn-sm btn-primary"
            type="submit">
            Post Comment
          </button>
        </div>
      </form>
    );
  }
}
CommentInput.propTypes = {
  comments: PropTypes.array,
  currentUser: PropTypes.object,
  slug: PropTypes.string,
  onSubmit: PropTypes.func,
}
const mapDispatchToProps = dispatch => ({
  onSubmit: (slug,comment) =>
    dispatch(CommentAtions.createComment(slug,comment))
});

export default connect(() => ({}), mapDispatchToProps)(CommentInput);
