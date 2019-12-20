//引入模块
const http = require('http'); //搭建服务器
const path = require('path'); // path模块 ，模块提供了一些用于处理文件路径的小工具
const urlModel = require('url'); // url模块 ，用于url解析、处理等操作的解决方案。
const template = require('_art-template@4.13.2@art-template'); //第三方模块，模板引擎
const fs = require('fs'); //file system 模板， 用于读写数据。
const bindRounder = require('./bindRouter');
const router = require('./router');


//创建http对象
const app = http.createServer();




//监听端口 ,设定为3000； 监听成功后，打印端口
app.listen(3000, () => {
    console.log('server is running at http://127.0.0.1:3000');
})







//注册请求事件
app.on('request', (req, res) => {


    let urlObj = urlModel.parse(req.url, true); //parse方法把收集到的url路径转化为对象。 true,表示将其转化为对象

    let query = urlObj.query; //query: [Object: null prototype] {键:值},   得到的是get传过来的键值。 但是已经变成了对象

    res.pathname = urlObj.pathname // 3000端口号后输入的路径

    res.method = req.method; //得到请求的方式




    bindRounder(req,res);

    router(req,res);

})

// function bindRounder(req,res){
//     res.rounder = function(filename,arrObj){
//         let content = template(path.join(__dirname, './views/'+filename+'.html'), arrObj);
//         res.end(content);
//     }
// }
//返回内容封装
// function rounder(filename,arrObj,res){
//     let content = template(path.join(__dirname, './views/'+filename+'.html'), arrObj);
//     res.end(content);
// }