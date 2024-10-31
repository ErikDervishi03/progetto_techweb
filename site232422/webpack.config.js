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
        test: /\.css$/, // Gestione dei file CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(mp3|wav|ogg)$/, // Gestione dei file audio
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]', // Nome del file output
              outputPath: 'sounds/', // Dove salvare i file audio
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map', // Mappa per il debug
  mode: 'development', // Modalità di sviluppo
};
