const path = require('path');
const purifyCssPlugin = require('purifycss-webpack');
const glob = require('glob-all');
const extractTextPlugin = require('extract-text-webpack-plugin');

let extractPlugin = new extractTextPlugin({
    filename: '[name].min.css',
    allChunks: false
});

//借助purifycss-webpack实现css的tree shaking
//使用下来就是这个插件在打包时会对所有设定的文件进行检索，收集所有使用到的css样式，没有使用的在打包时过滤掉
let purifyCss = new purifyCssPlugin({
    paths: glob.sync([
        //检测html文件中使用的css样式
        path.resolve(__dirname, './*.html'),
        //检测js中使用的css样式
        path.resolve(__dirname, './src/*.js')
    ])
});

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        publicPath: __dirname + '/dist/',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    use: {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }
                })
            }
        ]
    },
    plugins: [
        extractPlugin,
        purifyCss
    ]
}