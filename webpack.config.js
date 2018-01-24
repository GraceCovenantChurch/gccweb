const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const nconf = require('./src/config.js');
nconf.set('APP_ENV', 'browser');

const ASSET_HOST = nconf.get('ASSET_HOST');
const [assetHost, assetPort] = ASSET_HOST ? ASSET_HOST.split(':') : [];

const styleLoaders = [
  nconf.get('NODE_ENV') !== 'production' ? 'style-loader' : undefined,
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      minimize: nconf.get('NODE_ENV') === 'production'
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: loader => [
        require('postcss-import')({ root: loader.resourcePath }),
        require('postcss-nested')(),
        require('postcss-css-variables'),
        require('postcss-calc'),
        require('postcss-cssnext')({
          browsers: ['last 2 versions', '> 5%'],
        }),
      ],
      sourceMap: nconf.get('NODE_ENV') !== 'production' ? 'inline' : undefined,
    },
  },
].filter(loader => loader);

const publicEntry = {
  app: 'client/app.jsx',
  'pages/Home': 'client/pages/Home.jsx',
  'pages/welcome/Welcome': 'client/pages/welcome/Welcome.jsx',
  'pages/Page': 'client/pages/Page.jsx',
  'pages/AsyncPage': 'client/pages/AsyncPage.jsx',
  'pages/familygroup/FamilyGroup': 'client/pages/familygroup/FamilyGroup.jsx',
  'pages/ministries/Ministries': 'client/pages/ministries/Ministries.jsx',
};

const adminEntry = {
  adminApp: 'admin_client/app.jsx',
  adminModelPage: 'admin_client/pages/ModelPage.jsx',
};

const extractCSS = new ExtractTextPlugin({
  filename: '[name].bundle.css',
  allChunks: true,
});

module.exports = {
  context: path.resolve(__dirname, 'src'),
  devtool: nconf.get('NODE_ENV') !== 'production' ? 'cheap-module-eval-source-map' : undefined,
  entry: Object.assign({}, publicEntry, adminEntry),
  output: {
    path: path.resolve(__dirname, 'build/public/assets'),
    filename: '[name].js',
    chunkFilename: '[name]-chunk.js',
    publicPath: '/public/assets/',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: nconf.get('NODE_ENV') !== 'production' ? styleLoaders : extractCSS.extract({
          fallback: 'style-loader',
          use: styleLoaders,
        }),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', { modules: false }],
                'react',
              ],
              plugins: [
                'transform-object-rest-spread',
                'dynamic-import-webpack',
              ],
            },
          },
          // 'eslint-loader',
        ],
      },
    ],
  },
  plugins: [
    nconf.get('NODE_ENV') !== 'production' ? new webpack.HotModuleReplacementPlugin() : null,
    nconf.get('NODE_ENV') !== 'production' ? new webpack.NamedModulesPlugin() : null,
    new webpack.NoEmitOnErrorsPlugin(),
    nconf.get('NODE_ENV') !== 'production' ? new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }) : null,
    new webpack.DefinePlugin({
      NCONF: JSON.stringify({
        PUBLIC_SERVER_HOST: nconf.get('PUBLIC_SERVER_HOST'),
        ADMIN_SERVER_HOST: nconf.get('ADMIN_SERVER_HOST'),
        NODE_ENV: nconf.get('NODE_ENV'),
        APP_ENV: nconf.get('APP_ENV'),
        GOOGLE_MAPS_KEY: nconf.get('GOOGLE_MAPS_KEY'),
      }),
      CSS: 'true',
      'typeof window': '\"object\"', // for client-side mongoose build
    }),
    new webpack.NormalModuleReplacementPlugin(/nconf/, ((resource) => {
      resource.request = resource.request.replace(/nconf/, path.resolve(__dirname, 'src/nconf-browser'));
    })),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'react',
      minChunks(module, count) {
        const context = module.context;
        return context && (
          context.indexOf(path.join('node_modules', 'react')) >= 0 ||
          context.indexOf(path.join('node_modules', 'redux')) >= 0 ||
          context.indexOf(path.join('node_modules', 'fbjs')) >= 0 ||
          context.indexOf(path.join('node_modules', 'prop-types')) >= 0
        );
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'public',
      chunks: Object.keys(publicEntry),
      minChunks: 2,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'admin',
      chunks: Object.keys(adminEntry),
      minChunks: 2,
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
    nconf.get('NODE_ENV') === 'production' ? extractCSS : null,
  ].filter(plugin => plugin),

  devServer: {
    host: assetHost,
    port: assetPort,
    historyApiFallback: true,
    hot: true,
    compress: true,
    overlay: {
      errors: true,
    },
    stats: {
      colors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization',
    },
    publicPath: '/public/assets/',
  },
};