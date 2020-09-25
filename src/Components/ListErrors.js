import React from 'react';
import { PropTypes } from 'prop-types'

class ListErrors extends React.Component {
  render() {
    if (this.props.errors) {
      const errors = this.props.errors.errors
      return (
        <ul className="error-messages">
          {
            Object.keys(errors).map(key => {
              return (
                <li key={key}>
                  {key} {errors[key]}
                </li>
              );
            })
          }
        </ul>
      );
    } else {
      return null;
    }
  }
}
ListErrors.propTypes = {
  errors: PropTypes.object,
}
export default ListErrors;
