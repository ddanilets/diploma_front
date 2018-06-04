import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

class Start extends React.PureComponent {
  render() {
    return <div>You will be asked to
      fill some data about your project. Follow
      <Link to={`/${this.props.language}/profile`}>this</Link>
      link to proceed.</div>;
  }
}

export default connect((state) => {
  return {
    language: state.environment.language,
  };
})(Start);