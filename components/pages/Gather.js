import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import d3 from 'd3';
// window.d3 = d3;
import Tree from 'react-d3-tree';
import uuid from 'uuid';
import { addStage, editStage, removeStage }from '../../redux/stages/actions';
import Stage from '../shared/Stage';
import Input from '../shared/Input';

function transformStagesToTreeData(stages) {
  if (Object.keys(stages).length === 0) {
    return null;
  }
  Object.keys(stages).forEach((stage) => {
    stages[stage].children = Object.keys(stages)
      .filter(lookup => stages[lookup].parent === stages[stage].id)
      .map((el) => stages[el]);
  });
  const rootNode = Object.keys(stages).find(lookup => !stages[lookup].parent);
  return [stages[rootNode]];
}

const myTreeData = {
  0: {
    id: 0,
    name: 0,
    parent: {
      id: 1,
    },
  },
  1: {
    id: 1,
    name: 1,
    parent: {
      id: 2,
    },
  },
  2: {
    id: 2,
    name: 2,
    parent: {
      id: 5,
    }
  },
  3: {
    id: 3,
    name: 3,
    parent: {
      id: 1,
    },
  },
  4: {
    id: 4,
    name: 4,
    parent: {
      id: 2
    },
  },
  5: {
    id: 5,
    name: 5,
  },
};
class Gather extends React.Component {
  constructor() {
    super();

    this.addStage = ::this.addStage;
    this.shouldRenderAddNodeForm = ::this.shouldRenderAddNodeForm;
    this.onNewStageNameChange = ::this.onNewStageNameChange;
    this.onNodeClick = ::this.onNodeClick;
    this.onValueChange = ::this.onValueChange;

    this.state = {
      mounted: false,
      selected: null,
      newStageName: null,
      renderAddNodeForm: false,
    };
  }
  static propTypes = {
    stages: PropTypes.object,
    language: PropTypes.string,
  };

  componentDidMount() {
    this.setState({ mounted: true });
    if (Object.keys(this.props.stages).length === 0) {
      this.setState({ renderAddNodeForm: true, ancestor: null });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selected && this.props.stages[prevState.selected.id] !== prevProps.stages[prevState.selected.id]) {
      this.setState({ selected: this.props.stages[prevState.selected.id] });
    }
  }

  onNodeClick(e) {
    this.setState({ selected: this.props.stages[e.id] })
  }

  addStage(ancestor) {
    return () => {
      const payload = {
        name: this.state.newStageName,
        id: uuid.v4(),
        parent: this.state.ancestor,
      };
      this.props.addStage(payload);
      this.setState({ renderAddNodeForm: false, })
    }
  }

  onNewStageNameChange(value) {
    this.setState({ newStageName: value });
  }

  renderAddNodeForm() {
    return (
      <section className="add-stage">
        <div className="stage-adding">
          <Input
            id="stage-adding"
            onChange={this.onNewStageNameChange}
            label="Stage name"
            value={this.state.newStageName}
          />
          <button onClick={this.addStage()}>Create</button>
        </div>
      </section>
    );
  }

  shouldRenderAddNodeForm(ancestor) {
    console.log(ancestor);
    this.setState({ renderAddNodeForm: true, ancestor, })
  }

  onValueChange(value) {
    this.props.editStage(value)
  }

  renderSelectedStage() {
    if (this.state.selected) {
      return (
        <section className="selected-stage">
          <Stage
            value={this.state.selected.value}
            neededResources={this.state.selected.neededResources}
            name={this.state.selected.name}
            id={this.state.selected.id}
            shouldRenderAddNodeForm={this.shouldRenderAddNodeForm}
            onValueChange={this.onValueChange}
          />
        </section>
      );
    }
  }

  render() {
    return (
      <div className="gather page">
        <section className="intro">
          <div className="headline">
            <h1>Let's gather some data.</h1>
          </div>
          <div className="description">
            <h5>
              You will be asked to enter your project data: project stages, their relation, and types
              of resources and quantity required for each stage.
            </h5>
          </div>
        </section>
        <section className="add-form">
          {this.state.renderAddNodeForm && this.renderAddNodeForm()}
        </section>
        <section className="tree" style={{width: '500px', height: '500px'}}>
          {this.state.mounted && Object.keys(this.props.stages).length
          && <Tree data={transformStagesToTreeData(this.props.stages)} onClick={this.onNodeClick} />}
        </section>
        {this.renderSelectedStage()}
      </div>
    );
  }
}

export default connect(( state ) => {
  return {
    stages: state.stages,
    language: state.environment.stages,
  };
}, {
  addStage,
  editStage,
  removeStage,
})(Gather);