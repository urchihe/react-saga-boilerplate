import React from 'react';
import ArticleActions from '../Stores/Article/Actions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types'

const ListPagination = (props) => {
  if (props.articlesCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(props.articlesCount / 10); ++i) {
    range.push(i);
  }

  const setPage = page => {
    if(props.pager) {
      props.onSetPage(page, props.pager(page));
    }else {
      props.onSetPage(page, props.onGetArticles(page))
    }
  };

  return (
    <nav>
      <ul className="pagination">

        {
          range.map(v => {
            const isCurrent = v === props.currentPage;
            const onClick = ev => {
              ev.preventDefault();
              setPage(v);
            };
            return (
              <li
                className={ isCurrent ? 'page-item active' : 'page-item' }
                onClick={onClick}
                key={v.toString()}>

                <a className="page-link" href={"null"}>{v + 1}</a>

              </li>
            );
          })
        }

      </ul>
    </nav>
  );
};
ListPagination.propTypes = {
  inProgress: PropTypes.bool,
  pager: PropTypes.string,
  articlesCount: PropTypes.number,
  currentPage: PropTypes.number,
  onSetPage: PropTypes.func,
  onGetArticles: PropTypes.func, 
}

const mapDispatchToProps = dispatch => ({
  onSetPage: (page, payload) =>
    dispatch(ArticleActions.setPage({ page, payload })),
  onGetArticles: (page) =>
    dispatch(ArticleActions.getArticles(page))
});

export default connect(() => ({}), mapDispatchToProps)(ListPagination);
