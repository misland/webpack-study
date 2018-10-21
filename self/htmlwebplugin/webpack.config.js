const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

// 测试html-webpack-plugin插件
// 此插件的作用是将打包的文件插入到指定的html中，有多个入口文件就插入多个script标签
let config = {
    entry: {
        app: './src/app.js',
        main: './src/main.js'
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'test.html',// 生成的html文件，如果不提供，插件就自动生成一个html文件，名字是index.html
            template: 'index.html'// 用于生成html文件的模板
        })
    ]
}

module.exports = config
