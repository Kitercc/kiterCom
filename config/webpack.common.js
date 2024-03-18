const path = require('path')

module.exports = {
  resolve: {
    extensions: ['.tsx', '.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset'
      }
    ]
  },
  output: {
    filename: 'lczCom.min.js',
    path: path.resolve(__dirname, '../dist')
  }
}
