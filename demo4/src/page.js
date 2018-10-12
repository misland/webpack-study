//单页面应用的代码切割，不同于多页面切割，是通过写法和内置函数实现，不用配置文件，两种方式，一种用import，一种用require.ensure
// 通过impot能将依赖的文件分别打包成多个文件，如下面会打包出来三个文件
//subPageA.chunk.js、subPageB.chunk.js、vendor~lodash.chunk.js
//坑一：使用注释来告诉webpack打包后的文件的名字？这是什么操作？，不加注释的话打包出来的文件是用数字命名的
//坑二：import和括号之间不能有空格
//通过import引入的文件，会自动执行js文件，也就是页面加载时控制台就会打印出信息
//引入的第三方package在打包后文件名会自动加上vendor~
// import(/*webpackChunkName:'subPageA'*/ './subPageA').then(function (subPageA) {
//     console.log(subPageA);
// });
//
// import(/*webpackChunkName:'subPageB'*/ './subPageB').then(function (subPageB) {
//     console.log(subPageB);
// });
//
// import(/*webpackChunkName:'lodash'*/ 'lodash').then(function (_) {
//     console.log(_.join(['1', '2']))
// });


//通过require.ensure也能切割，下面这种方式会打包成两个文件
//subPage.chunk.js、vendor~lodash.chunk.js
require.ensure(
    ['./subPageA.js', './subPageB.js'],//引入的文件列表
    function () {
        var subPageA = require('./subPageA');//这里用require再次引入才会执行js文件，ensure引入不会执行
        var subPageB = require('./subPageB');
    },
    'subPage' //打包后的文件名字subPage.chunk.js
);

require.ensure(
    ['lodash'],
    function () {
        var lodash = require('lodash');
        console.log(lodash.join(['1', '2']));
    },
    'lodash'//第三方的会自动加上vendor，为vendor~lodash.chunk.js
)


export default 'page';