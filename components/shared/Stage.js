import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from './Input';
import Select from './Select';


class Stage extends React.PureComponent {
  constructor() {
    super();

    this.onNameChange = ::this.onNameChange;
    this.onValueChange = ::this.onValueChange;
    this.onNeededResourcesChange = ::this.onNeededResourcesChange;
    this.shouldRenderAddNodeForm = ::this.shouldRenderAddNodeForm;

  }
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.number,
    onValueChange: PropTypes.func,
    neededResources: PropTypes.array,
  };

  onNameChange(value) {
    this.props.onValueChange({
      id: this.props.id,
      name: value,
    });
  }

  onValueChange(value) {
    this.props.onValueChange({
      id: this.props.id,
      value,
    });
  }

  onNeededResourcesChange(value) {
    this.props.onValueChange({
      id: this.props.id,
      neededResources: value,
    });
  }

  shouldRenderAddNodeForm() {
    this.props.shouldRenderAddNodeForm(this.props.id);
  }

  render() {
    return (
      <div className="stage">
        <Input
          onChange={this.onNameChange}
          id={`${this.props.id}-name`}
          label="Name"
          value={this.props.name}
        />
        <Input
          onChange={this.onValueChange}
          id={`${this.props.id}-value`}
          label="Value"
          value={this.props.value}
        />
        <Select
          onChange={this.onNeededResourcesChange}
          id={`${this.props.id}-resources`}
          label="Required resources"
          multiple={true}
          options={this.props.defaultResources}
          value={this.props.neededResources}
        />
        <div className="button-wrapper">
          <button onClick={this.shouldRenderAddNodeForm}>
            Add child stage
          </button>
        </div>
      </div>
    );
  }
}

export default connect(({ project }) => {
  return {
    defaultResources: project.defaultResources
  };
})(Stage);