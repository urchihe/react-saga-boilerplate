import ListErrors from './ListErrors';
import React from 'react';
import EditorActions from '../Stores/Editor/Actions';
import ArticleActions from '../Stores/Article/Actions';
import CommonActions from '../Stores/Common/Actions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types'

class Editor extends React.Component {
  constructor(props) {
    super(props);

    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value);
    this.changeTitle = updateFieldEvent('title');
    this.changeDescription = updateFieldEvent('description');
    this.changeBody = updateFieldEvent('body');
    this.changeTagInput = updateFieldEvent('tagInput');

    this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.props.onAddTag();
      }
    };

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag);
    };

    this.submitForm = ev => {
      ev.preventDefault();
      const article = {
        title: this.props.title,
        description: this.props.description,
        body: this.props.body,
        tagList: this.props.tagList
      };

      const slug = { slug: this.props.articleSlug };
      const promise = this.props.articleSlug ?
        this.props.onUpdateArticle(Object.assign(article, slug)) :
        this.props.onCreateArticle(article);

      this.props.onSubmit(promise);
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(this.props.onGetArticles(this.props.match.params.slug));
      }
      this.props.onLoad(null);
    }
  }

  componentWillMount() {
    if (this.props.match.params.slug) {
      return this.props.onLoad(this.props.onGetArticles(this.props.match.params.slug));
    }
    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">

              <ListErrors errors={this.props.errors}></ListErrors>

              <form>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Article Title"
                      value={this.props.title}
                      onChange={this.changeTitle} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="What's this article about?"
                      value={this.props.description}
                      onChange={this.changeDescription} />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      value={this.props.body}
                      onChange={this.changeBody}>
                    </textarea>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter tags"
                      value={this.props.tagInput}
                      onChange={this.changeTagInput}
                      onKeyUp={this.watchForEnter} />

                    <div className="tag-list">
                      {
                        (this.props.tagList || []).map(tag => {
                          return (
                            <span className="tag-default tag-pill" key={tag}>
                              <i  className="ion-close-round"
                                  onClick={this.removeTagHandler(tag)}>
                              </i>
                              {tag}
                            </span>
                          );
                        })
                      }
                    </div>
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}>
                    Publish Article
                  </button>

                </fieldset>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
Editor.propTypes = {
  currentUser: PropTypes.object,
  inProgress: PropTypes.bool,
  tagList: PropTypes.array,
  errors: PropTypes.array,
  onAddTag: PropTypes.func,
  onLoad: PropTypes.func,
  onRemoveTag: PropTypes.func,
  onSubmit: PropTypes.func, 
  onUnload: PropTypes.func,
  onUpdateField: PropTypes.func,
}
const mapStateToProps = state => ({
  ...state.editor
});

const mapDispatchToProps = dispatch => ({
  onAddTag: () =>
    dispatch(EditorActions.addTag()),
  onLoad: payload =>
    dispatch(EditorActions.editorPageloaded({payload})),
  onRemoveTag: tag =>
    dispatch(EditorActions.removeTag({tag})),
  onSubmit: payload =>
    dispatch(EditorActions.articleSubmitted({payload})),
  onUpdateField: (key, value) =>
    dispatch(EditorActions.updateFieldEditor({key, value })),
  onUpdateArticle: (slug, article) =>
    dispatch(ArticleActions.updateArticle(slug, article )),
  onCreateArticle: (article) =>
    dispatch(ArticleActions.createArticle(article)),
  onGetArticles: (article) =>
    dispatch(ArticleActions.getArticles(article)),
  onUnload: () =>
    dispatch(CommonActions.pageUnloaded())
});
export default connect(mapStateToProps, mapDispatchToProps)(Editor);
