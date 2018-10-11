const path=require('path')

module.exports={
    entry:{
        app:'./app.js'
    },
    output:{
        publicPath:__dirname+'/dist',
        path:path.resolve('dist'),
        filename:'[name].js'
    }
}