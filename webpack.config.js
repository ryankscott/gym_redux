const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  return {
    devtool: "cheap-module-source-map",
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
          test: /\.html$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true }
            }
          ]
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                minimize: false,
                camelCase: true,
                modules: true,
                importLoaders: 1,
                localIdentName: "[name]__[local]--[hash:base64:5]"
              }
            },
            {
              loader: "postcss-loader"
            }
          ]
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          }
        }
      }
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./index.html",
        filename: "./index.html"
      }),
      new webpack.DefinePlugin({
        __PRODUCTION__: argv.mode == "production",
        __BACKEND_URL__:
          argv.mode == "production"
            ? JSON.stringify("https://www.ryankscott.com/classsearch/?q=")
            : JSON.stringify("http://localhost:3000/db/")
      })
    ],
    devServer: {
      contentBase: "./dist",
      compress: true,
      port: 8080
    }
  };
};
