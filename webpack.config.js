import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";
import { dirname } from "path";
import webpack from "webpack";

// Simulate __dirname and __filename in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  mode: "development",
  entry: "./src/index.jsx",
  devtool: "eval-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, // clean dist before build
    publicPath: "auto",
  },
  resolve: {
    extensions: [".js", ".jsx"], // resolve imports without extensions
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              [
                "@babel/preset-react",
                {
                  runtime: "automatic", // Enable the new JSX transform
                },
              ],
            ],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.module\.css$/, // CSS Modules
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.css$/, // Global CSS
        exclude: /\.module\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: "ticTacToe",
      remotes: {
        authApp: "authApp@http://localhost:3000/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0" },
        "react-dom": {
          singleton: true,
          requiredVersion: "^19.0.0",
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "dist"),
    hot: true,
    port: 4000,
    open: true,
    historyApiFallback: true,
  },
};
