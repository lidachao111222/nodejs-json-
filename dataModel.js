//引入模块
const http = require('http'); //搭建服务器
const path = require('path'); // path模块 ，模块提供了一些用于处理文件路径的小工具
const urlModel = require('url'); // url模块 ，用于url解析、处理等操作的解决方案。
const template = require('_art-template@4.13.2@art-template'); //第三方模块，模板引擎
const fs = require('fs'); //file system 模板， 用于读写数据。
const bindRounder = require('./bindRouter');




module.exports = {
    //得到所有英雄的数据
    getAllHeros(callback) {
        fs.readFile(path.join(__dirname, './heros.json'), (err, data) => {
            if (err) return callback(err.message);
            let arrObj = JSON.parse(data);
            callback(null,arrObj);
        })
    },

    // 根据id得到单个英雄的数据
    getEachHero(id,callback){
        this.getAllHeros((err,data)=>{
            if(err) return callback(err);
            let obj;
            data.some(item=>{
                if(item.id == id){
                    obj = item;
                }
            })
            callback(null,obj);
        })
    },

    //添加新的英雄到json文件中
    addNewHero(obj,callback){
        this.getAllHeros((err,data)=>{
            if(err) return callback(false);

            // 得到所有data的数据。去最后一个的id+1
            // console.log(+data[data.length-1].id + 1);

            obj.id = ((+data[data.length-1].id) + 1).toString();   //转为string形式
            // console.log(obj);

            //把新的数据传入到data中再写入到json文件内
            data.push(obj);
            // console.log(data);
            // console.log(JSON.stringify(data));

            fs.writeFile(path.join(__dirname,'./heros.json'),JSON.stringify(data),(err)=>{
                if(err) return console.log(false);
                callback(true);
            })
           
        })
    },


    // 改变英雄信息
    changeHeroInfo(obj,callback){
        this.getAllHeros((err,data)=>{
            if(err) return callback(false);
            //得到修改对象的id
            let id = obj.id;

            // console.log(typeof data);

            //遍历得到id所在位置
            for (let i =0 ; i<data.length; i++){
                if(data[i].id == id){
                    // console.log(i);
                    data[i]=obj;
                    console.log(data);
                }
            } 


            //写入到json中
            fs.writeFile(path.join(__dirname,'./heros.json'),JSON.stringify(data),(err)=>{
                if(err) return console.log(false);
                callback(true);
            })

        })
    }

}