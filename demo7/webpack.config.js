const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        publicPath: __dirname + '/dist/',
        path: path.resolve('dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                //extract-text-webpack-plugin插件的作用
                //用于将所有入口文件中引用的css或scss文件分离出来，打包成一个单独的css文件，具体名字就是plugins中设置的[name].min.css
                //为什么要把css文件单独打包出来？
                //为了加载时更快速，因为默认是将css文件和js文件打包在一起，加载的时候也是一起加载
                //这样如果css文件很大加载时间就会比较长，将css文件单独打包出来这样加载时是并行加载的，可以提升加载速度
                //会为每个入口文件打包一个css文件
                //打包出来的css文件要手动添加到index.html中，因为已经和js分离了
                use: extractTextPlugin.extract({
                    //fallback的作用是处理没有单独打包的scss，这时用fallback中设置的loader来处理
                    //这样的话下面plugins中的allChunks就要设置为false才行
                    //比如本例子中的common.scss是通过事件引入的，那就要用这个配置了
                    //把common.scss转换成一个style标签插入到head中
                    fallback: {
                        loader: 'style-loader'
                    },
                    //use是设置用哪些loader将要分离出来的scss文件打包成css模块（文件）
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new extractTextPlugin({
            filename: '[name].min.css',
            allChunks: false
        })
    ]
}