import React from 'react';
import PropTypes from 'prop-types';
import './styles/input.scss';

class Input extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  };

  onChange(e) {
    return this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div className="input-wrapper">
        <input
          className="input-element"
          type="text"
          id={`${this.props.id}-input`}
          onChange={::this.onChange}
          value={this.props.value}
        />
        <label
          htmlFor={`${this.props.id}-input`}
        >
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default Input;