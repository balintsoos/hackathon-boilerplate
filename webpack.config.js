module.exports = {
  entry: './public/src/js/main.js',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?cacheDirectory'
      },
    ],
  },
  output: {
    path: `${__dirname}/public/dist`,
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './public/dist',
  }
}
