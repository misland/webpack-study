module.exports = function (css) {
    console.log(css);
    if (window.innerWidth < 1000) {
        return css.replace('red', 'green');
    }
    else {
        return css;
    }
}