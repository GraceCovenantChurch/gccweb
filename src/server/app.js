import express from 'express';
import path from 'path';
import compression from 'compression';
import mongoose from 'mongoose';
import logger from 'morgan';
import api from './api';
import PageRouter from './pageRouter';

const nconf = require('../config.js');
nconf.set('APP_ENV', 'server');

process.on('unhandledRejection', (err) => {
  console.log(err);
});

const app = express();
app.use(compression());

if (nconf.get('NODE_ENV') !== 'production') {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const proxy = require('http-proxy-middleware'); // eslint-disable-line global-require

  app.use(proxy(`http://${nconf.get('ASSET_HOST')}/public/assets`));

  app.use(logger('dev'));
} else {
  app.use(logger('tiny'));
}

app.use('/static/images/:image([A-Za-z\d\/]*)', function(req, res){
  res.redirect('https://s3.amazonaws.com/gcc-public/static/images/' + req.params.image);
})

app.use('/static', express.static(path.join(__dirname, '../../static')));
app.use('/bower_components', express.static(path.join(__dirname, '../../bower_components')));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/api', api);

const routes = require('../client/routes').default;
const reducers = require('../client/modules').default;

app.use(PageRouter(routes, reducers, (head, content, state) => `
    <!doctype html>
    <html ${head.htmlAttributes.toString()}>
      <head>
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        <link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="/public/assets/app.bundle.css" />
        <link rel="stylesheet" type="text/css" href="/public/assets/public.bundle.css" />
      </head>
      <body ${head.bodyAttributes.toString()}>
        ${content}
        <script type="text/javascript">window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>
        <script type="text/javascript" src="/public/assets/manifest.js"></script>
        <script type="text/javascript" src="/public/assets/react.js"></script>
        <script type="text/javascript" src="/public/assets/public.js"></script>
        <script type="text/javascript" src="/public/assets/app.js"></script>
      </body>
    </html>
  `));

mongoose.set('debug', nconf.get('NODE_ENV') !== 'production');
mongoose.connect(nconf.get('MONGODB_URI'), { useMongoClient: true }, (err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');

  const port = nconf.get('PUBLIC_SERVER_HOST').split(':')[1] || 80;
  app.listen(port, () => {
    console.log('Server listening on port', port);
  });
});
