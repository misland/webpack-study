const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');

let extractPlugin = new extractTextPlugin({
    filename: '[name].min.css',
    allChunks: false
});

let spritesConfig = {
    spritePath: './dist/sprites'
};

module.exports = {
    entry: {
        sprites: './src/app.js'
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
                        {
                            loader: 'css-loader'
                        },
                        //合成雪碧图的配置，用postcss-loader和postcss-sprites
                        //厉害的是生成的css样式也是根据雪碧图来生成的，不用再重新写css样式了
                        {
                            loader:'postcss-loader',
                            options:{
                                ident:'postcss',
                                plugins: [require('postcss-sprites')(spritesConfig)]
                            }
                        }
                    ]
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
                            limit: 1000,//这里把上限调小，防止压缩后的图片被转码成base64格式
                            publicPath: 'quant/',//html页面加载图片时的位置
                            outputPath: 'quant/'//打包后图片存放位置
                        }
                    },
                    {
                        //配置图片压缩，image-loader应该是压缩图片的加载接口
                        //压缩图片用imagemin，这个应该相当于一个基础框架，具体工作需要不同的子组件完成，因为图片格式多种
                        //不同格式的图片有不同的压缩插件，比如png格式的是imagemin-pngquant
                        //测试下来压缩效果明显，10K大小的图片压缩后只有1.8K
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                require('imagemin-pngquant')({
                                    quality: 80//设置压缩图片质量
                                })
                            ]
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