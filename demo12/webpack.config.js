const path = require('path');
const webpack = require('webpack');

let config = {
    entry: {
        app: './src/app.js'
    },
    output: {
        publicPath: __dirname + '/dist/',
        path: path.resolve('dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    resolve: {
        alias: {
            //表示当使用是jQuery时，就去后面的路径寻找
            //$表示精确匹配
            jQuery$: path.resolve('./src/vendor/jquery.min.js')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',//使用npm安装了jquery，这里表示使用$时用的是npm安装的jquery
            jQuery: 'jQuery'//表示使用jQuery时使用本地的是Query文件
        })
    ]
};

module.exports = config;