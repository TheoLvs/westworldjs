const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  mode:'development',
  target: 'web',
  devtool: 'inline-source-map',
  // devServer:{
  //   static: {
  //     directory: path.join(__dirname, 'dist'),
  //   },
  // },
  // devServer: {contentBase: './dist'},
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dev',
      tempate: './dist/index2.html',
      inject: "body",
    }),
  ],
  output: {
    library:{
        name:"westworld",
        type:"var",
    },
    filename: 'westworld.js',
    path: path.resolve(__dirname, 'dist'),
  },
//   plugins:[
//     new UglifyJsPlugin({
//         sourceMap: true,
//         parallel: 4,
//         uglifyOptions: {
//             keep_classnames: true,
//             keep_fnames: true
//         }
//     })
//   ]
};