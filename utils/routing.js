
export const getCurrentRoute = (routerState) => {
  if (routerState && routerState.route) {
    const currentRoute = routerState.route;
    return currentRoute.pageName || currentRoute.name;
  }
  return null;
};

const isOneOfRoutes = (routeNames, currentRoute) => {
  if (routeNames && currentRoute) {
    return routeNames.includes(currentRoute);
  }
  return false;
};
