const path = require('path');

module.exports = require('./webpack.common')('common', {
  app: path.resolve(__dirname, 'client/app.jsx'),
  'pages/Home': path.resolve(__dirname, 'client/pages/Home.jsx'),
  'pages/About': path.resolve(__dirname, 'client/pages/About.jsx'),
  'pages/Page': path.resolve(__dirname, 'client/pages/Page.jsx'),
  'pages/AsyncPage': path.resolve(__dirname, 'client/pages/AsyncPage.jsx'),
});
