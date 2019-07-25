module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname + '/client',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './client'
  }
};
