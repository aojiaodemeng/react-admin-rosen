const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath:'/dist/',
    filename: 'js/app.js'
  },
  resolve:{
    alias:{
      page: path.resolve(__dirname, 'src/page'),
      component: path.resolve(__dirname, 'src/component')
    }
  },
  module: {
	rules: [
		// react（jsx）语法的处理
	  {
	    test: /\.jsx$/,
	    exclude: /(node_modules)/,
	    use: {
	      loader: 'babel-loader',
	      options: {
	        presets: ['env','react']
	      }
	    }
	  },
	  	//css的处理
	  {
	  	test: /\.css$/,
	  	use: ExtractTextPlugin.extract({
	  		fallback:'style-loader',
	  		use:'css-loader'
	  	})
	  },
	   //scss的处理
	  {
	  	test: /\.scss$/,
	  	use: ExtractTextPlugin.extract({
	  		fallback:'style-loader',
	  		use:['css-loader','sass-loader']
	  	})
	  },
	  //图片的处理
	  {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
            	name:'resource/[name].[ext]'
            },
          },
        ],
      },
      //字体的处理
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
            	name:'resource/[name].[ext]'
            },
          },
        ],
      }
	]
  },
  plugins: [
  	//处理html文件
  	new HtmlWebpackPlugin({
  		template:'./src/index.html',
      favicon: './favicon.ico'
  	}),
  	//独立css文件
  	new ExtractTextPlugin("css/[name].css"),
  	//提出公共模块
  	new webpack.optimize.CommonsChunkPlugin({
  		name:'common',
  		filename:'js/base.js'
  	})
  ],
  devServer: {
  	// contentBase: './dist'
  	port: 8086,
    // historyApiFallback: {
    //   index:'/dist/index.html'
    // }
  }
};