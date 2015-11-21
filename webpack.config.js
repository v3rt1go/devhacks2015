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
      { test: /\.js$/, loader: "babel" }
    ]
  },
  resolve: {
    alias: {
      // Workaround https://github.com/Reactive-Extensions/RxJS/issues/832, until it's fixed
      'rx$': '<path to rx/dist/rx.js file >'
    }
  }
};
