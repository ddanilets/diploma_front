/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';
import React from 'react';
import serialize from 'serialize-javascript';
import Head from './Head';
import { getJsBundleFiles } from '../../config/bundleManifest';

class Html extends React.PureComponent {
  static propTypes = {
    store: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    bundleId: PropTypes.string.isRequired,
  };

  renderJsBundles() {
    const jsFiles = getJsBundleFiles(this.props.bundleId);
    return jsFiles.map((jsFile) => {
      return <script key={jsFile} type="text/javascript" src={jsFile} />;
    });
  }
  render() {
    const state = this.props.store.getState();
    return (
      <html lang={state.environment.language}>
        <Head
          bundleId={this.props.bundleId}
          env={process.env.NODE_ENV}
        />
        <body>
          <div id="app">{this.props.children}</div>
          <script dangerouslySetInnerHTML={{ __html: `window.App=${serialize(state)};` }} />
          { this.renderJsBundles() }
        </body>
      </html>
    );
  }
}

export default Html;
