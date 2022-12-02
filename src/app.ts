import express = require('express');
import path = require('path');

export const app = express();

// 设置静态文件目录
app.use(express.static(path.join(__dirname, '../public')));

// 设置跨域访问
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method.toUpperCase() == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

// 全局设置 json 数据格式转换中间件
// import bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
// app.use(jsonParser);
// app.use(urlencodedParser);

// 设置路由
import { router as index } from './routes/index';
app.use('/', index);

import { RES_CODE } from './models/code';
// 设置默认成功返回
app.use((req, res, next) => {
    res.send({
        code: RES_CODE.SUCCESS,
        message: RES_CODE[RES_CODE.SUCCESS],
        data: req.body.router_default_data
    });
});

// 设置默认错误返回
app.use((err: RES_CODE, req: any, res: any, next: any) => {
    res.send({
        code: err || RES_CODE.ERROR,
        message: RES_CODE[err] || RES_CODE[RES_CODE.ERROR]
    });
});