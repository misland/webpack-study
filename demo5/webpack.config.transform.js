const path = require('path');
module.exports = {
    entry: {
        transform: './src/app.js'
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
                        //通过transform选项对css转化规则进行设定
                        //转换是加载css之前，加载之后不起作用了，需要重新加载页面才行
                        loader: 'style-loader',
                        options: {
                            singleton: true,
                            transform:'./css.transform.js'
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