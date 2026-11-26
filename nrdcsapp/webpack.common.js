const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin').default;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-tags-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist') 
  },
  module: {
    rules: [
      {
        test: /\.?tsx$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,       // (1)
        type: 'asset/resource',
      },
      {
        // Babel config for SVG as react component
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 3001,
    historyApiFallback: true,
  },
  plugins: [
   
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html')
    }),  
    new MiniCssExtractPlugin({
      filename: 'main.css',
      chunkFilename: 'main.[id].css'
    }),
    new HtmlWebpackIncludeAssetsPlugin({ 
      assets: [
         'assets/scss/materialdesignicons.min.css'
      ], 
      append: true }),
  ]
};
