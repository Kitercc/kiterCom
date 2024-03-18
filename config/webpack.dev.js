const path = require('path')

const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = merge(common, {
  entry: {
    main: path.resolve(__dirname, '../src/dev')
  },
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
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
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true
        }
      }
    ]
  },
  plugins: [
    new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      hash: true
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintPlugin({
      extensions: ['ts', 'tsx', 'js']
    })
  ],
  devServer: {
    client: {
      progress: false,
      overlay: {
        errors: true,
        warnings: false
      }
    },
    static: {
      directory: path.join(__dirname, '../public')
    },
    proxy: {
      // 代理 用做获取大屏文件
      '/HappyServer': {
        target: 'http://144.20.80.98:8081'
      }
    },
    compress: true,
    port: 8800,
    hot: true
  }
})
