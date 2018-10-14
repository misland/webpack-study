import base from './css/base.css'
import '../css.transform'

let clicked = false;
window.addEventListener('click', function () {
    if (!clicked) {
        console.log('abc')
        import('./css/base.css');
    }
});

//加载和卸载css
let flag = false;
setInterval(function () {
    if (flag) {
        base.use();
    }
    else {
        base.unuse();
    }
    flag = !flag;
}, 1000)

