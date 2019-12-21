const controller = require('./controller');




module.exports = function router(req, res) {
    //通过请求的 URL 路径来区别不同请求
    if (res.method == 'GET' && (res.pathname == '/' || res.pathname == '/index' || res.pathname == '/index.html' || res.pathname == '/favicon.ico ')) {

        controller.showIndex(req, res)

    } else if (res.method == 'GET' && (res.pathname == '/add' || res.pathname == '/add.html')) {

        controller.showAdd(req, res)

    } else if (res.method == 'GET' && (res.pathname == '/edit' || res.pathname == '/edit.html')) {

        controller.showEdit(req, res)

    } else if (res.method == 'GET' && (res.pathname == '/info' || res.pathname == '/info.html')) {

        controller.showInfo(req, res)

    } else if (res.method == 'GET' && res.pathname.startsWith('/node_modules')) {
        //bootstrap.css的请求
        controller.staticDoc(req, res)

    } else if (res.method == 'POST' && res.pathname.startsWith('/createNew')) {
        controller.createNew(req,res);

    } else if (res.method == 'POST' && res.pathname.startsWith('/changeHeroInfo')) {
        controller.changeHeroInfo(req,res);

    }  else {
        res.end('404');
    }

}