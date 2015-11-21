'use strict';

module.exports = {
  context: __dirname,
  entry: "./public/javascripts/index.js",
  output: {
    path: __dirname + "/",
    filename: "./public/javascripts/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
};
