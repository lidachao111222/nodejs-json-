//引入模块
const http = require('http'); //搭建服务器
const path = require('path'); // path模块 ，模块提供了一些用于处理文件路径的小工具
const urlModel = require('url'); // url模块 ，用于url解析、处理等操作的解决方案。
const template = require('_art-template@4.13.2@art-template'); //第三方模块，模板引擎
const fs = require('fs'); //file system 模板， 用于读写数据。
const bindRounder = require('./bindRouter');



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

    let pathname = urlObj.pathname // 3000端口号后输入的路径

    let method = req.method; //得到请求的方式

    bindRounder(req,res);

    //通过请求的 URL 路径来区别不同请求
    if (method == 'GET' && (pathname == '/' || pathname == '/index' || pathname == '/index.html' || pathname == '/favicon.ico ')) {
        //得到html内容传出去。 这里直接使用art-template。不用readfile, 目的是为了后期好封装

        //得到json得到数据
        fs.readFile(path.join(__dirname, './heros.json'), (err, data) => {

            if (err) return console.log(err.message);
            //把数据转为对象
            let arrObj = JSON.parse(data);
            // 把对象传入的模板引擎中，生成动态数据
            // let content = template(path.join(__dirname, './views/index.html'), arrObj);
            // res.end(content);

            res.rounder('index',arrObj);
        })

    } else if (method == 'GET' && (pathname == '/add' || pathname == '/add.html')) {
        // //添加页面的请求
        // let content = template(path.join(__dirname, './views/add.html'), {});
        // //把内容传回到浏览器
        // res.end(content);

        res.rounder('add',{});
    } else if (method == 'GET' && (pathname == '/edit' || pathname == '/edit.html')) {
        //编辑页面的请求
        // let content = template(path.join(__dirname, './views/edit.html'), {})
        // res.end(content);

        res.rounder('edit',{});
    } else if (method == 'GET' && (pathname == '/info' || pathname == '/info.html')) {
        //编辑页面的请求
        // let content = template(path.join(__dirname, './views/info.html'), {})
        // res.end(content);

        res.rounder('info',{});
    } else if (method == 'GET' && pathname == '/node_modules/bootstrap/dist/css/bootstrap.css') {
        //bootstrap.css的请求
        fs.readFile(path.join(__dirname, './node_modules/bootstrap/dist/css/bootstrap.css'), (err, data) => {
            if (err) return console.log(err.message);
            res.writeHead(200, {
                'Content-Type': 'text/css; charset=utf8;'
            })
            res.end(data);
        })

    } else if (method == 'GET' && pathname == '/node_modules/jquery/dist/jquery.js') {
        //jquery的请求
        fs.readFile(path.join(__dirname, '/node_modules/jquery/dist/jquery.js'), 'utf8', (err, data) => {
            if (err) return console.log(err.message);
            res.end(data);
        })
    } else {
        res.end('404');
    }


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