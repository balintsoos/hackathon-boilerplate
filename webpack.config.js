module.exports = {
  entry: './public/src/main.js',
  output: {
    path: `${__dirname}/public/dist`,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
    ],
  },
}
