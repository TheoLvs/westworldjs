const path = require('path');
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  target: 'web',
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