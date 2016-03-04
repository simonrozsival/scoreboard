var path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src', 'client.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'app')
  },
  resolve: {
    extensions: [ '', '.js', '.less' ]
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: [ 'react', 'es2015', 'stage-0', 'stage-1', 'stage-2' ]
        }
      },
      { test: /\.less$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!less' },
      { test: /\.png$/, loader: 'url' }
    ]
  }
};
