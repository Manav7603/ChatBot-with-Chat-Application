const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "https": require.resolve("https-browserify"),
      "querystring": require.resolve("querystring-es3"),
      "http": require.resolve("stream-http"),
      "os": require.resolve("os-browserify/browser"),
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "fs": false, // or require.resolve("fs") if needed
      "net": require.resolve("net-browserify"),
      "child_process": false,
      "tls": require.resolve("tls-browserify"),
    }
  },
  entry: './src/app.js', // Adjust the entry point according to your project structure
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development', // Set the mode to development
  module: {

    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ],

    // rules: [
    //   {
    //     test: /\.scss$/,
    //     use: [
    //       'style-loader',
    //       'css-loader',
    //       'sass-loader'
    //     ]
    //   }
    // ],

    
    // rules: [
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     use: {
    //       loader: 'babel-loader',
    //       options: {
    //         presets: ['@babel/preset-react'],
    //       },
    //     },
    //   },
    // ],



  },
};













// const path = require('path');

// module.exports = {
//   resolve: {
//     fallback: {
//       // "stream": require.resolve("stream-browserify"),
//       // "https": require.resolve("https-browserify"),
//       // "querystring": require.resolve("querystring-es3"),
//       // "http": require.resolve("stream-http"),
//       // "os": require.resolve("os-browserify/browser"),
//       // "path": require.resolve("path-browserify"),
//       // "crypto": require.resolve("crypto-browserify"),
//       // "stream": require.resolve("stream-browserify"),
//       //   "http": require.resolve("stream-http"),
//       //   "https": require.resolve("https-browserify"),
//       //   "fs": false, // or require.resolve("fs") if needed
//       //   "os": require.resolve("os-browserify/browser"),
//       //   "child_process": false, // or require.resolve("child_process") if needed
//       //   "crypto": require.resolve("crypto-browserify"),
//       //   "querystring": require.resolve("querystring-es3"),
//       //   "path": require.resolve("path-browserify"),
      
//       "stream": false,
//       "https": false,
//       "querystring":false,
//       "http": false,
//       "os": false,
//       "path": false,
//       "crypto": false,
//       "stream": false,
//         "http": false,
//         "https": false,
//         "fs": false, // or require.resolve("fs") if needed
//         "os": false,
//         "child_process": false, // or require.resolve("child_process") if needed
//         "crypto": false,
//         "querystring":false,
//         "path": false,
//     }
//   },
//   entry: './src/app.js', // Adjust the entry point according to your project structure
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   // Add other webpack configurations as needed for your project
// };
