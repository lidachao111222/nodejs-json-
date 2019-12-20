//引入模块
const http = require('http'); //搭建服务器
const path = require('path'); // path模块 ，模块提供了一些用于处理文件路径的小工具
const urlModel = require('url'); // url模块 ，用于url解析、处理等操作的解决方案。
const template = require('_art-template@4.13.2@art-template'); //第三方模块，模板引擎
const fs = require('fs'); //file system 模板， 用于读写数据。
const bindRounder = require('./bindRouter');





module.exports = function router(req,res) {
    //通过请求的 URL 路径来区别不同请求
    if (res.method == 'GET' && (res.pathname == '/' || res.pathname == '/index' || res.pathname == '/index.html' || res.pathname == '/favicon.ico ')) {
        //得到html内容传出去。 这里直接使用art-template。不用readfile, 目的是为了后期好封装

        //得到json得到数据
        fs.readFile(path.join(__dirname, './heros.json'), (err, data) => {

            if (err) return console.log(err.message);
            //把数据转为对象
            let arrObj = JSON.parse(data);
            // 把对象传入的模板引擎中，生成动态数据
            // let content = template(path.join(__dirname, './views/index.html'), arrObj);
            // res.end(content);

            res.rounder('index', arrObj);
        })

    } else if (res.method == 'GET' && (res.pathname == '/add' || res.pathname == '/add.html')) {
        // //添加页面的请求
        // let content = template(path.join(__dirname, './views/add.html'), {});
        // //把内容传回到浏览器
        // res.end(content);

        res.rounder('add', {});
    } else if (res.method == 'GET' && (res.pathname == '/edit' || res.pathname == '/edit.html')) {
        //编辑页面的请求
        // let content = template(path.join(__dirname, './views/edit.html'), {})
        // res.end(content);

        res.rounder('edit', {});
    } else if (res.method == 'GET' && (res.pathname == '/info' || res.pathname == '/info.html')) {
        //编辑页面的请求
        // let content = template(path.join(__dirname, './views/info.html'), {})
        // res.end(content);

        res.rounder('info', {});
    } else if (res.method == 'GET' && res.pathname == '/node_modules/bootstrap/dist/css/bootstrap.css') {
        //bootstrap.css的请求
        fs.readFile(path.join(__dirname, './node_modules/bootstrap/dist/css/bootstrap.css'), (err, data) => {
            if (err) return console.log(err.message);
            res.writeHead(200, {
                'Content-Type': 'text/css; charset=utf8;'
            })
            res.end(data);
        })

    } else if (res.pathname == 'GET' && res.pathname == '/node_modules/jquery/dist/jquery.js') {
        //jquery的请求
        fs.readFile(path.join(__dirname, '/node_modules/jquery/dist/jquery.js'), 'utf8', (err, data) => {
            if (err) return console.log(err.message);
            res.end(data);
        })
    } else {
        res.end('404');
    }

}