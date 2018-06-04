import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Input from '../shared/Input';
import Select from '../shared/Select';
import { updateProfile } from '../../redux/project/actions';

class Profile extends React.PureComponent {
  static propTypes = {
    projectName: PropTypes.string,
    language: PropTypes.string,
    selectedResources: PropTypes.array,
    occuredRisks: PropTypes.array,
    availableResources: PropTypes.array,
    defaultResources: PropTypes.array,
    defaultRisks: PropTypes.array,
    updateProfile: PropTypes.func,
  };

  onNameChange(value) {
    this.props.updateProfile({ name: value });
  }

  onSelectedResourcesChange(value) {
    this.props.updateProfile({ selectedResources: value });
  }

  onOccuredRisksChange(value) {
    this.props.updateProfile({ occuredRisks: value });
  }

  onAvailableResourcesChange(value) {
    this.props.updateProfile({ availableResources: value });
  }

  render() {
    return (
      <div className="profile page">
        <section className="intro">
          <div className="headline">
            <h1>Let's gather some data.</h1>
          </div>
          <div className="description">
            <h5>
              You will be asked to enter your project-specific data: name, resources needed for
              project, risks occurency in past (leave empty if it's a new project), resources
              available for this project.
            </h5>
          </div>
        </section>
        <section className="data">
          <div className="form-wrapper">
            <form>
              <Input
                value={this.props.projectName}
                id="project-name"
                label="Name"
                onChange={::this.onNameChange}
              />
              <Select
                value={this.props.selectedResources}
                id="needed-resources"
                label="Resources required for project"
                multiple={true}
                onChange={::this.onSelectedResourcesChange}
                options={this.props.defaultResources}
              />
              <Select
                value={this.props.occuredRisks}
                id="occured-risks"
                multiple={true}
                label="Risks that already occured to project"
                onChange={::this.onOccuredRisksChange}
                options={this.props.defaultRisks}
              />
              <Select
                value={this.props.availableResources}
                id="available-resources"
                multiple={true}
                label="Resources available for project"
                onChange={::this.onAvailableResourcesChange}
                options={this.props.defaultResources}
              />
            </form>
          </div>
        </section>
        <section className="submit">
          <div className="wrapper">
            <Link to={`/${this.props.language}/gather`}>Continue with project</Link>
          </div>
        </section>
      </div>
    );
  }
}

export default connect(({ project, environment }) => {
  return {
    projectName: project.profile.name,
    selectedResources: project.profile.selectedResources,
    occuredRisks: project.profile.occuredRisks,
    availableResources: project.profile.availableResources,
    defaultResources: project.defaultResources,
    defaultRisks: project.defaultRisks,
    language: environment.language,
  };
}, { updateProfile })(Profile);