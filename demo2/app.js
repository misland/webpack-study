import 'babel-polyfill';//转换ES6语法让js在不支持ES6的浏览器也能运行，比如IE11，如果不引入IE中无法输出下面的信息

let func = () => {
    console.log('Hello World');
}

const NUM = 45;
let arr = [1, 2, 3];
let arrB = arr.map(function (value) {
    return value * 2;
})

//includes跟indexOf类似功能，但是更强大
console.log(arrB.includes(8));
console.log(arrB.includes(6));
console.log('new Set(arrB) is:', new Set(arrB));