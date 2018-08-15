// I completely separate the webpack dev config and webpack production config.
// Because trying to "share" common config between them just results in an unreadable mess.
// Completely laying them out explicitly like this makes them easier to read
// without having to jump around in different files.

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// Production only plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = (env, options) => ({
	// basic stuff
	mode: 'production',
	entry: [
		'./src/app.ts'
	],
	target: "web",
	// This is production, so run optimizations
	optimization: {
		minimizer: [
			new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: false }),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	devtool: false,
	output: {
		// use hashes in file names to bust caches
		filename: 'app.[contenthash:6].js',
		// we are gonna put our output js/css files under the assets folder
		path: path.resolve(__dirname, 'dist/assets'),
		publicPath: '/assets/'
	},
	resolve: {
		extensions: ['.ts', '.js', '.vue'],
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
				test: /\.css$/,
				use: [
					// here, unlike development, we will put all styling into css files
					MiniCssExtractPlugin.loader,
					"css-loader" // translates CSS into CommonJS
				]
			},
			{
				test: /\.scss$/,
				use: [
					// here, unlike development, we will put all styling into css files
					MiniCssExtractPlugin.loader,
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
							name: 'images/[name].[ext]'
						}
					}
				]
			},
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: 'app.[contenthash:6].css'
		}),
		//new CopyWebpackPlugin([{ from: 'public/', to: 'dist/' }]), maybe, if you have assets in there
		new ForkTsCheckerWebpackPlugin(),
		// use manifest plugin to generate json file that gives the actual filename for each asset
		// your actual application server would read this so it properly includes the references to each of them
		new ManifestPlugin()
	]
});
