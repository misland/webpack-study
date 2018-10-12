const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        pageA: './src/pageA.js',
        pageB: './src/pageB.js'
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    optimization: {
        //是否压缩代码，这里设置为false后即使是production模式下打包后的代码也不会被压缩
        minimize: false,
        splitChunks: {
            cacheGroups:{
                common: {
                    name: 'common',
                    chunks: 'all',
                    minSize: 1,
                    //打包优先级，值越大，打包时顺序越靠前
                    priority: 0
                },
                vendor: {
                    name: 'vendor',
                    //test表示要打包的文件夹
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 10
                }
            }
        }
    }
}