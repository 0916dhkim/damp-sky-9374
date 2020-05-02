const webpack = require("webpack");
const merge = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const path = require("path");

const isDevelopment = process.env.NODE_ENV !== "production";
const devServerPort = process.env.WEBPACK_WDS_PORT || 9080;

/** @type {import("webpack").Configuration} */
const baseConf = {
  mode: isDevelopment ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: "ts-loader" }]
      }
    ]
  },
  resolve: {
    extensions: [".json", ".js", ".ts"]
  },
  devtool: isDevelopment ? "eval-source-map" : false,
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || "development",
      WEBPACK_WDS_PORT: devServerPort
    })
  ]
};

/** @type {import("webpack").Configuration} */
const serverConf = {
  name: "server",
  entry: {
    server: "./server.ts"
  },
  output: {
    path: path.resolve(__dirname, "dist/server"),
    filename: "[name].js"
  },
  target: "node"
};

/** @type {import("webpack").Configuration} */
const browserConf = {
  name: "browser",
  entry: {
    browser: "./web.ts"
  },
  output: {
    path: path.resolve(__dirname, "dist/browser"),
    filename: "[name].js"
  }
};

/** @type {import("webpack").Configuration} */
const testConf = {
  name: "test",
  entry: {
    test: "./test.js"
  },
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist/test"),
    filename: "[name].js"
  },
  externals: [nodeExternals()]
};

module.exports = [serverConf, browserConf, testConf].map(conf =>
  merge.smart(baseConf, conf)
);
