//引入模块
const http = require('http'); //搭建服务器
const path = require('path'); // path模块 ，模块提供了一些用于处理文件路径的小工具
const urlModel = require('url'); // url模块 ，用于url解析、处理等操作的解决方案。
const template = require('_art-template@4.13.2@art-template'); //第三方模块，模板引擎
const fs = require('fs'); //file system 模板， 用于读写数据。
const bindRounder = require('./bindRouter');




module.exports = {
    getAllHeros(callback) {
        fs.readFile(path.join(__dirname, './heros.json'), (err, data) => {
            if (err) return callback(err.message);
            let arrObj = JSON.parse(data);
            callback(null,arrObj);
        })
    }
}