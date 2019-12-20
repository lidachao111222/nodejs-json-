//引入模块
const http = require('http'); //搭建服务器
const path = require('path'); // path模块 ，模块提供了一些用于处理文件路径的小工具
const urlModel = require('url'); // url模块 ，用于url解析、处理等操作的解决方案。
const template = require('_art-template@4.13.2@art-template'); //第三方模块，模板引擎
const fs = require('fs'); //file system 模板， 用于读写数据。
const bindRounder = require('./bindRouter');





module.exports = function router(req, res) {
    //通过请求的 URL 路径来区别不同请求
    if (res.method == 'GET' && (res.pathname == '/' || res.pathname == '/index' || res.pathname == '/index.html' || res.pathname == '/favicon.ico ')) {

        fs.readFile(path.join(__dirname, './heros.json'), (err, data) => {
            if (err) return console.log(err.message);
            let arrObj = JSON.parse(data);


            res.rounder('index', arrObj);
        })

    } else if (res.method == 'GET' && (res.pathname == '/add' || res.pathname == '/add.html')) {


        res.rounder('add', {});
    } else if (res.method == 'GET' && (res.pathname == '/edit' || res.pathname == '/edit.html')) {


        res.rounder('edit', {});
    } else if (res.method == 'GET' && (res.pathname == '/info' || res.pathname == '/info.html')) {


        res.rounder('info', {});
    } else if (res.method == 'GET' && res.pathname.startsWith('/node_modules')) {
        //bootstrap.css的请求
        fs.readFile(path.join(__dirname, res.pathname), (err, data) => {

            if (err) return console.log(err.message);

            if (res.pathname.endsWith('.css')) {
                res.writeHead(200, {
                    'Content-Type': 'text/css; charset=utf8;'
                })
            }

            res.end(data);
        })

    } else {
        res.end('404');
    }

}