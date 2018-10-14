const path = require('path');
module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        //第一次的时候踩到这里的坑了，publicPath表示静态资源发布的地方
        //如果不设置该参数，页面就不知道去哪里加载除了app.bundle.js之外的文件了
        //另外路径也不能用path.resolve，觉得path.resolve出来的是绝对路径,这里需要用相对路径
        //publicPath:path.resolve('dist')
        publicPath: __dirname + '/dist/',
        path: path.resolve('dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    //这个配置的作用其实是配置css样式在页面上的加载形式
                    //用style-loader的话打包后css样式是通过link的方式在html的head中展示，如
                    //<link rel="stylesheet" type="text/css" href="D:\01work\01code\Node\Webpack\GodBMW\demo5/dist/4812459d823ed5aa9061b955036d5148.css">
                    {loader: 'style-loader/url'},
                    {loader: 'file-loader'}
                ]
            }
        ]
    }
}