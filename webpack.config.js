const path = require("path");
const dev = process.env.NODE_ENV == "development";
const liveServer = require("live-server");

if (dev) {
  liveServer.start({
    root: "./",
    file: "index.html",
  });
}

module.exports = {
  watch: dev,
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      }, {
        test: /\.(png|jpe?g)$/i,
        use: "url-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".png", "jpeg"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};
