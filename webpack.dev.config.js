// I completely separate the webpack dev config and webpack production config.
// Because trying to "share" common config between them just results in an unreadable mess.
// Completely laying them out explicitly like this makes them easier to read
// without having to jump around in different files.

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// just for html5 history api fallback (there will be no 404s)
const history = require('connect-history-api-fallback')
const convert = require('koa-connect')

module.exports = (env, options) => ({
	mode: 'development',
	entry: [
		'./src/app.ts'
	],
	target: "web",

	devtool: 'source-map',
	output: {
		filename: 'app.js',
		// from https://webpack.js.org/configuration/dev-server/#devserver-publicpath-
		// "It is recommended that devServer.publicPath is the same as output.publicPath."
		// "It is also possible to use a full URL. This is necessary for Hot Module Replacement."
		publicPath: 'http://localhost:8080/'
	},
	serve: {
		// this part is just for getting webpack-serve to properly serve the index.html file
		// in a real app, the index may likely be served from the actual server backend
		content: path.join(__dirname, 'public'),
		add: (app, middleware, options) => {
			app.use(convert(history({})));
		}
	},
	devServer: {
		// webpack-serve might not actually use these, but I'm including them just-in-case
		contentBase: path.join(__dirname, 'public'),
		publicPath: 'http://localhost:8080/',
		hot: true,
		errorOverlay: true
	},
	resolve: {
		extensions: ['.ts', '.js', '.vue'],
		// the alias helps to easily reference .vue components without having to use relative paths all the time
		alias: {
			'@': path.resolve(__dirname, "src")
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'babel-loader'
					},
					{
						loader: 'ts-loader',
						options: {
							// following recommended approach from here:
							// https://github.com/TypeStrong/ts-loader/tree/master/examples/fast-incremental-builds
							transpileOnly: true,
							experimentalWatchApi: true,
						},
					}
				],
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				// for development, I'm just letting the style-loader handle the application of all styling 
				// no need for webpack to output or having to reference css files in development
				test: /\.css$/,
				use: [
					"style-loader", // creates style nodes from JS strings
					"css-loader" // translates CSS into CommonJS
				]
			},
			{
				// for development, I'm just letting the style-loader handle the application of all styling 
				// no need for webpack to output or having to reference css files in development
				test: /\.scss$/,
				use: [
					"style-loader", // creates style nodes from JS strings
					"css-loader", // translates CSS into CommonJS
					"sass-loader" // compiles Sass to CSS
				]
			},
			{
				test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 4096,
							name: 'img/[name].[hash:8].[ext]'
						}
					}
				]
			},
		]
	},
	plugins: [
		// this makes .vue components work
		new VueLoaderPlugin(),
		// this runs typescript type checking
		// following recommended approach from here:
		// https://github.com/TypeStrong/ts-loader/tree/master/examples/fast-incremental-builds
		new ForkTsCheckerWebpackPlugin(),
	]
});
