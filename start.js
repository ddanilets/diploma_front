/* eslint-disable no-console, global-require */
require('ignore-styles');
require('@babel/register');
global.window = {
  HTMLIFrameElement: function() {},
};
global.document = {
  createTextNode: () => {},
  createElement: () => {
    return {
      setAttribute: () => {},
      appendChild: () => {},
    };
  },
  querySelector: () => {
    return {
      appendChild: () => {},
    };
  },
};
global.Element = {
  prototype: {},
};
global.CSSStyleDeclaration = {
  prototype: {},
};

const env = process.env.NODE_ENV;

const server = require('./server/main').default;

const port = process.env.PORT || 8090;
server.listen(port, '0.0.0.0');
console.log(`Application listening on port ${port}`);

if (env !== 'local') {
  process.on('uncaughtException', (err) => {
    Error.stackTraceLimit = 1;
    Error.captureStackTrace(err);
    process.exit(1);
  });
} else {
  process.on('uncaughtException', (err) => {
    console.log(err);
  });
}

module.exports = server;
