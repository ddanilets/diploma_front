/* eslint-disable prefer-const */
import createMemoryHistory from 'history/createMemoryHistory';
import { matchPath } from 'react-router-dom';

import { getBrowserIdByUserAgent } from '../../bundle-utils/manifest';
import configureStore from '../../redux/configureStore';
import { updateLocation } from '../../redux/environment/actions';
import renderHtml from './renderHtml';
import routes from '../../routes/routes';

export default (req, res) => {
  global.userAgent = req.header('User-Agent');
  let bundleId = '';
  if (process.env.NODE_ENV !== 'local') {
    bundleId = getBrowserIdByUserAgent(global.userAgent);
  }
  const history = createMemoryHistory({
    initialEntries: [req.originalUrl],
  });
  const { store } = configureStore(history);
  let match = null;
  routes.some((route) => {
    match = matchPath(req.originalUrl, route);
    if (match) {
      match.route = route;
      return true;
    }
    return false;
  });
  if (match) {
    store.dispatch(updateLocation(match.params));
    let context = {};
    const html = renderHtml(bundleId, req.originalUrl, store, context);

    if (!context.url) {
      res
        .status(200)
        .type('html')
        .send(html);
    } else {
      res.redirect(301, context.url);
    }
  } else {
    return res.status(404).send('Not found');
  }
}
