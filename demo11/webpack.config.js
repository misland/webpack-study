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
                test: /\.(eot|woff2?|ttf|svg)$/,
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