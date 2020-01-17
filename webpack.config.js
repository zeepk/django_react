// load the babel loader,
module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				// test: /\.(jpg|JPG|jpeg|png|gif|mp3|svg|ttf|woff2|woff|eot)$/gi,

				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
};
