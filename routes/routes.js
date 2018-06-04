/* eslint-disable react/prop-types */
import { compile } from 'path-to-regexp';
import { Redirect } from 'react-router';
import React from 'react';
import Start from '../components/pages/Start';
import Profile from '../components/pages/Profile';
import Gather from '../components/pages/Gather';

const routes = [
  {
    path: '/:language',
    exact: true,
    render: (props) => {
      return (<Redirect to={`/${props.match.params.language}/start`} />);
    },
  },
  {
    path: '/:language/start',
    pageName: 'app-start',
    component: Start,
    exact: true,
    noCache: true,
  },
  {
    path: '/:language/profile',
    pageName: 'project-profile',
    component: Profile,
    exact: true,
    noCache: true,
  },
  {
    path: '/:language/gather',
    pageName: 'project-gather',
    component: Gather,
    exact: true,
    noCache: true,
  },
];

export default routes;

export function createUrlByName(routeName, routeParams) {
  try {
    return compile(routes.filter((route) => {
      return route.pageName === routeName;
    })[0].path)(routeParams);
  } catch (err) {
    return null;
  }
}
