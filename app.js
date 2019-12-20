//引入模块
const http = require('http');





//创建http对象
const app = http.createServer();




//监听端口 ,设定为3000； 监听成功后，打印端口
app.listen(3000,()=>{
    console.log('server is running at http://127.0.0.1:3000');
})







//注册请求事件
app.on('request',(req,res)=>{
    res.end('rungging')
})