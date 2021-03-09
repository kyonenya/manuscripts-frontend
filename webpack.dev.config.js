const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
//  watch: false,
  watch: true,
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  plugins: [
    new Dotenv(),
  ],
}
