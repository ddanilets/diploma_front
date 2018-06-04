import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateLocation } from '../../redux/environment/actions';
import { routeChanged } from '../../redux/application/actions';

export default (props = {}) => {
  return (Component) => {
    class ConnectedRoute extends React.Component {
      static propTypes = {
        updateLocation: PropTypes.func.isRequired,
        routeChanged: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
      };

      getRouteParams() {
        const { location, match } = this.props;
        return {
          location,
          match,
          route: props.route,
          params: {
            ...match.params,
          },
        };
      }

      componentWillMount() {
        this.props.updateLocation(this.props.match.params);
        this.props.routeChanged(this.getRouteParams());
      }

      render() {
        return (<Component {...props} {...this.props} />);
      }
    }

    return connect(null, { updateLocation, routeChanged })(ConnectedRoute);
  };
};
