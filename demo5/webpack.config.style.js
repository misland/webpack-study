const path = require('path');
module.exports = {
    entry: {
        style: './src/app.js'
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
                use: [
                    //而如果用css-loader时css样式是在html的head标签内通过<style>标签的形式插入的
                    {
                        //在style-loader后面加上useable可以动态加载和卸载css，通过use和unuse方法，具体在app.js中
                        loader: 'style-loader/useable',
                        options: {
                            singleton: true,
                        }
                    },
                    {
                        loader: 'css-loader',
                        options:{
                            minimize: true
                        }
                    }
                ]
            }
        ]
    }
}