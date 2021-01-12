let path = require('path');
let webpack = require('webpack');
let BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname,
  entry: './frontend/src/Index.js',
  output: {
      path: path.resolve('./assets/bundles/'),
      filename: "[name].js"
  },
  plugins: [
    new BundleTracker({
      path: __dirname,
      filename: './webpack-stats.json',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|jpe?g)$/,
        use: [
          {
            options: {
              name: "[name].[ext]",
              outputPath: "img/"
            },
            loader: "file-loader"
          }
        ]
      },
    ]
  }
}
