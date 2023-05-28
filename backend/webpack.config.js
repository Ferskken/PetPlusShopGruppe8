const path = require('path');
var nodeExternals = require('webpack-node-externals');
const CopyPlugin = require("copy-webpack-plugin");


// Load the environment variables from .env

module.exports = {
      mode: 'production',
      entry: __dirname + '/src/server.ts',
      module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: '/node-modules/',
            },
        ]
      },
      resolve: {
        extensions: ['.ts', '.js']
      },
      target: 'node', // important in order not to bundle built-in modules like path, fs, etc.
      output: {
        filename: 'server.js',
        path: path.resolve(__dirname,'../dist'),
      },
      externals: [nodeExternals({
          // this WILL include this libraries in the bundle
          allowlist: []
      })],
     plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, ".env"),
          }, {
            from: path.resolve(__dirname, "keys"),
            to: 'keys'
          },{
            from: path.resolve(__dirname, "public"),
            to: 'public'
          },{
            from: path.resolve(__dirname, "database.sqlite"),
          }
        ],
      }), 
    ]
}
