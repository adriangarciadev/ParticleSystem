const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'min.js',
    library: 'PS',
    libraryTarget: 'umd',
  },
  optimization: {
		// We no not want to minimize our code.
		minimize: false
	}
  
};