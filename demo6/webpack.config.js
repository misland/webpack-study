const path = require('path');

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
                //要处理scss文件，需要node-sass和sass-loader两个包
                //当然之前的style-loader和css-loader也是不可少的
                test: /\.scss$/,
                use: [
                    //不加url默认是通过style标签形式插入到head中
                    {loader : 'style-loader'},//将js字符串生成为style节点
                    {loader : 'css-loader'},//将css转换成CommonJS模块
                    {loader : 'sass-loader'} //将scss转换为css
                ]
            }
        ]
    }
}