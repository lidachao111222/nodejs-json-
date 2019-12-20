
//引入模块
const http = require('http'); //搭建服务器
const path = require('path'); // path模块 ，模块提供了一些用于处理文件路径的小工具
const urlModel = require('url'); // url模块 ，用于url解析、处理等操作的解决方案。
const template = require('_art-template@4.13.2@art-template'); //第三方模块，模板引擎
const fs = require('fs'); //file system 模板， 用于读写数据。
const bindRounder = require('./bindRouter');



module.exports= {

    //展示首页
    showIndex(req,res){
        fs.readFile(path.join(__dirname, './heros.json'), (err, data) => {
            if (err) return console.log(err.message);
            let arrObj = JSON.parse(data);


            res.rounder('index', arrObj);
        })
    },


    //展示添加页面
    showAdd(req,res){
        res.rounder('add', {});
    },


    //展示编辑页面
    showEdit(req,res){
        res.rounder('edit', {});
    },


    // 展示详情页面
    showInfo(req,res){
        res.rounder('info', {});
    },


    // 静态文件请求
    staticDoc(req,res){
        fs.readFile(path.join(__dirname, res.pathname), (err, data) => {

            if (err) return console.log(err.message);

            if (res.pathname.endsWith('.css')) {
                res.writeHead(200, {
                    'Content-Type': 'text/css; charset=utf8;'
                })
            }

            res.end(data);
        })
    }

}