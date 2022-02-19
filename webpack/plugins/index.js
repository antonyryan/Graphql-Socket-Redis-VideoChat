const webpack = require('webpack');

const commonPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
];

const serverPlugins = [
  ...commonPlugins,
];

const clientPlugins = [
  ...commonPlugins,
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
  }),
];

module.exports = { serverPlugins, clientPlugins };
