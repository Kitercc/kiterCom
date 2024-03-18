const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const common = require('./webpack.common.js')
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  entry: {
    lczCom: path.resolve(__dirname, '../src')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer']]
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin({ filename: '[name].css' })]
})
