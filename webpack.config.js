const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.s?css$/,
        oneOf: [
          {
            test: /\.module\.s?css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1,
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                  camelCase: true,
                },
              },
              'sass-loader',
            ],
          },
          {
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          },
        ],
      },

      {
        test: /\.(woff|ttf|png|jpg|gif|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        use: {
          loader: 'file-loader',
          options: { limit: 10000, name: '/images/[name].[ext]' },
        },
      },
      {
        test: /\.inline.svg$/,
        loader: 'react-svg-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss', '.json'],
    alias: {
      // js: path.resolve(__dirname, 'src','js'),
      styles: path.resolve(__dirname, 'src', 'styles'),
    },
  },
  plugins: [
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 6,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),

    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'google-poppins',
          entry: {
            path:
              'https://fonts.googleapis.com/css?family=Poppins:300,400,600,700,900',
            type: 'css',
          },
        },
        {
          module: 'google-oswald',
          entry: {
            path:
              'https://fonts.googleapis.com/css?family=Oswald:500,600,700',
            type: 'css',
          },
        },
      ],
    }),
    new CopyWebpackPlugin([
      {
        from: './src/images',
        to: path.resolve(__dirname, 'dist/images'),
      },
    ]),
  ],
  devServer: {
    port: 8081,
    contentBase: 'src/',
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },

  node: {
    dns: 'mock',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    path: true,
    url: false,
  },
};
