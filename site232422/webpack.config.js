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
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Risolve le estensioni nei file importati
  },
  devtool: 'source-map',
  mode: 'development',
};
