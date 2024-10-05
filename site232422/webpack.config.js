const path = require('path');

module.exports = {
  entry: './views/main.jsx', // Punto d'ingresso del bundle
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js', // Bundle che verrà servito
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Estensioni JS e JSX
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  mode: 'development',
};
