const path = require('path');

//测试tree shaking
//tree shaking就是把没有用的引用函数或文件去掉，比如util.js中的multi方法并没有在app.js中使用
//打包时在production模式下就不会把multi方法打包，而是将其过滤掉
module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].bundle.js'
    },
    mode: 'production'
}