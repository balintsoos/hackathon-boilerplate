module.exports = {
  entry: './public/src/js/main.js',
  module: {
    loaders: [
      { test: /\.css$/, loaders: ['style', 'css'] },
    ],
  },
  output: {
    path: `${__dirname}/public/dist`,
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './public/dist',
  },
}
