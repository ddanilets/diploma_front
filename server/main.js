import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import staticHandlers from './handlers/static';
import applicationHandler from './handlers/application';
import globalApiHandler from './handlers/globalApi';

const server = express();
server.use(compression());
server.use(cookieParser());
staticHandlers(server);
server.use('/global-api', globalApiHandler);
server.use(applicationHandler);

export default server;
