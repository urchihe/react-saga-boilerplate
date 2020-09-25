import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';
import React from 'react';
import ArticleActions from '../../Stores/Article/Actions';
import CommonActions from '../../Stores/Common/Actions';
import CommentActions from '../../Stores/Comment/Actions';
import { connect } from 'react-redux';
import marked from 'marked';
import { PropTypes } from 'prop-types'

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: this.props.match.params.id,
      textValue: "",
    };
  }
  componentDidMount() {
    if(this.state.slug){
       this.props.onLoad(this.state.slug)
    }
  }
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.article) {
      return null;
    }
    const markup = { __html: marked(this.props.article.body || '') };
     const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.article.author.username
    return (
      <div className="article-page">

        <div className="banner">
          <div className="container">

            <h1>{this.props.article.title}</h1>
            <ArticleMeta
              article={this.props.article}
              canModify={canModify} />

          </div>
        </div>

        <div className="container page">

          <div className="row article-content">
            <div className="col-xs-12">

              <div dangerouslySetInnerHTML={markup}></div>

              <ul className="tag-list">
                {
                  this.props.article.tagList.map(tag => {
                    return (
                      <li
                        className="tag-default tag-pill tag-outline"
                        key={tag}>
                        {tag}
                      </li>
                    );
                  })
                }
              </ul>

            </div>
          </div>

          <hr />

          <div className="article-actions">
          </div>

          <div className="row">
            <CommentContainer
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.match.params.id}
              currentUser={this.props.currentUser} />
          </div>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  comments: PropTypes.object,
  article: PropTypes.object,
  currentUser: PropTypes.object,
  canModify: PropTypes.bool,
  onLoad: PropTypes.func,
  onUnload: PropTypes.func,
  loadComments: PropTypes.func,
  
}

const mapStateToProps = state => ({
  ...state.article, 
  ...state.comment,
  currentUser: state.auth.currentUser
});
const mapDispatchToProps = dispatch => ({
  onLoad: slug => {
    dispatch(ArticleActions.getArticle(slug))
    dispatch(CommentActions.getArticleComments(slug))
  },
  onUnload: () =>
    dispatch(CommonActions.pageUnloaded()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
