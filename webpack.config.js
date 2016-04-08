module.exports = {
  context: `${__dirname}/src/public/src`,
  entry: './js/main.js',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?cacheDirectory'
      },
    ],
  },
  output: {
    path: `${__dirname}/src/public/dist`,
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './src/public/dist',
  }
}
