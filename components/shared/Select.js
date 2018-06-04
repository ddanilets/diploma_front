import React from 'react';
import PropTypes from 'prop-types';
import './styles/select.scss';

class Select extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    multiple: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      text: PropTypes.string,
    })).isRequired,
  };

  static defaultProps = {
    multiple: false,
  };

  onChange(e) {
    if (this.props.multiple) {
      const value = [...[...e.target.options].filter(option => option.selected).map(option => option.value)];
      this.props.onChange(value);
    } else {
      this.props.onChange(e.target.value);
    }
  }

  render() {
    return (
      <div className="input-wrapper">
        <select
          className="select-element"
          multiple={this.props.multiple}
          id={`${this.props.id}-select`}
          onChange={::this.onChange}
          value={this.props.value}
        >
          {this.props.options.map((el, key) => {
            return <option value={el.value} key={el.key}>{el.text}</option>
          })}
        </select>
        <label
          htmlFor={`${this.props.id}-select`}
        >
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default Select;