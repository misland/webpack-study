//es6方式引入，但是这种不支持Nodejs
import sum from './vendor/sum';

console.log('test sum: ' + sum(1, 4));

//CommonJS方式引入
var minus = require('./vendor/minus')
console.log('test minus : ' + minus(2, 3));

//AMD方式引入
//这种方式引入的文件在打包时会单独打包出来一个文件，原理暂时不明
//引入文件的方式是用中括号
require(['./vendor/multi'], function (multi) {
    console.log('test multi : ' + multi(10, 10));
})

