const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');

let extractPlugin = new extractTextPlugin({
    filename: '[name].min.css',
    allChunks: false
});

module.exports = {
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
                    use: {
                        loader: 'css-loader'
                    }
                })
            },
            {
                //图片打包用url-loader来处理，
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].min.[ext]',//打包时自动生成的名字规则，图片名+五位hash值+min+格式
                            limit: 20000,//需要打包的最小大小，超过20Kb就打包，小于20Kb就转换成base64格式
                            publicPath: 'static/',//html页面加载图片时的位置
                            outputPath: 'static/'//打包后图片存放位置
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        extractPlugin
    ]
}