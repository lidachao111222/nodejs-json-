//引入模块
const http = require('http'); //搭建服务器
const path = require('path'); // path模块 ，模块提供了一些用于处理文件路径的小工具
const urlModel = require('url'); // url模块 ，用于url解析、处理等操作的解决方案。
const template = require('_art-template@4.13.2@art-template'); //第三方模块，模板引擎
const fs = require('fs'); //file system 模板， 用于读写数据。
const bindRounder = require('./bindRouter');
const dataModel = require('./dataModel')
const querystring = require('querystring');
const moment = require('moment');

module.exports = {

    //展示首页
    showIndex(req, res) {


        //回調函數，得到json得到的数据，并返回到浏览器
        dataModel.getAllHeros((err, data) => {
            if (err) return res.end(JSON.stringify({
                code: 200,
                mes: '导出所有英雄数据失败'
            }))
            res.rounder('index', data);
        })


    },


    //展示添加页面
    showAdd(req, res) {
        res.rounder('add', {});
    },


    //展示编辑页面
    showEdit(req, res) {
        // console.log(req.query.id);
        //根据id将数据传回;
        dataModel.getEachHero(req.query.id,(err,data)=>{
            if(err) return res.end(err);

            res.rounder('edit', data);
        })
       
    },


    // 展示详情页面
    showInfo(req, res) {

        // 展示各个英雄信息
        // 从req对象得到从浏览器传过来的id
        // console.log(req.query.id);
        //将id挂载到req上传到数据层得到数据
        dataModel.getEachHero(req.query.id,(err,data)=>{
            if(err) res.edn(JSON.stringify({
                code:201,
                msg:err
            }) )

            res.rounder('info', data);
        });



     
    },


    // 静态文件请求
    staticDoc(req, res) {
        fs.readFile(path.join(__dirname, res.pathname), (err, data) => {

            if (err) return console.log(err.message);

            if (res.pathname.endsWith('.css')) {
                res.writeHead(200, {
                    'Content-Type': 'text/css; charset=utf8;'
                })
            }

            res.end(data);
        })
    },


    //创建新的英雄方法
    createNew(req,res){
        
        // console.log(res);

        let str = '';

        req.on('data',chunk=>{
            str += chunk;
        })

        req.on('end',()=>{
            let obj = querystring.parse(str);

            let date = moment().format('YYYY-MM-DD hh:mm:ss');

            obj.date = date;

            // console.log(obj);
            dataModel.addNewHero(obj,(data)=>{
                if(data == false) return res.end(JSON.stringify({
                    code:201,
                    msg: 'create error'
                }))
                res.end(JSON.stringify({
                    code:200,
                    msg:'success'
                }))
            });
        })
    },


    //改变英雄方法
    changeHeroInfo(req,res){    

        let str ='';

        req.on('data',chunk=>{
            str+=chunk;
        });

        req.on('end',()=>{
            let obj = querystring.parse(str);
            
            let date = moment().format('YYYY-MM-DD hh:mm:ss');

            obj.date = date;
            //进去json中改变数据
            dataModel.changeHeroInfo(obj,(err,data)=>{
                if(err == false) return res.end(JSON.stringify({
                    code:201,
                    msg: 'change error'
                }))
                res.end(JSON.stringify({
                    code:200,
                    msg: 'success'
                }))
            });
        })

    }

}