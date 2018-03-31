const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: './docs/src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'docs/dist'),
    publicPath: '/docs/dist/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets:['es2015', 'stage-0', 'react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  devServer: {
    contentBase: './docs/',
    compress: true,
    progress: true,
    port: 2345,
    open: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: false,
      version: false,
      warnings: true,
      colors: true
    }
  }
}
