const proxy =  require('http-proxy-middleware');


module.exports = function(app){
    app.use(
        '/api',
        proxy({
            target:'http://127.0.0.1:8123',
            changeOrigin:true
        })
    )
}