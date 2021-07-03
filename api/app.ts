import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import fs from 'fs';
import https from 'https';
import OAuthHandler from './api';
import logger from '../util/logger';

export default function setupServer() {
  let app = express();
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use('/oauth', OAuthHandler);

  https.globalAgent.options.ca = require('ssl-root-cas').create();

  https.createServer({
    key: fs.readFileSync('/var/www/www-root/data/www/api.veuroexpress.org/cert/key.key'),
    cert: fs.readFileSync('/var/www/www-root/data/www/api.veuroexpress.org/cert/cert.pem'),
  }, app).listen(2096, () => logger.info('Server running on port 2096...'));
}