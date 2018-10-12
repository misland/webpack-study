const path = require('path')

module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /(node_modules)/, use: {loader: 'babel-loader'}}
        ]
    }
}