const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');

let extractPlugin = new extractTextPlugin({
    filename: '[name].min.css',
    allChunks: false
});

let config = {
    entry: {
        app: './src/app.js'
    },
    output: {
        publicPath: __dirname + '/dist/',
        path: path.resolve('dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: {
                        loader: 'style-loader'
                    },
                    use: [
                        {loader: 'css-loader'}
                    ]
                })
            },
            {
                //用url-loader打包字体文件
                //问题：有几个格式的字体文件，为什么打包后格式为svg？
                //根据打包时输出的信息，好像是因为.svg格式的文件是最后打包的，所以将最后的文件格式定义为svg
                test: /\.(eot|woff2?|svg|ttf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[hash:5].min.[ext]',
                        limit: 5000,
                        publicPath: 'fonts/',
                        outputPath: 'fonts/'
                    }
                }
            }
        ]
    },
    plugins: [
        extractPlugin
    ]
}

module.exports = config;