import express = require('express');

export const router = express.Router();

const random = Math.random();

// 测试信息
router.get('/info/:data', (req, res, next) => {
    const data = `${random} Hello, ${req.params.data}! time: ${new Date().toLocaleString()}`;
    req.body = data;
    next();
});

import { RES_CODE } from '../models/code';
// 测试错误
router.get('/error', (req, res, next) => {
    next(RES_CODE.TEST_ERROR);
});

import bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
router.post('/post', jsonParser, urlencodedParser, (req, res, next) => {
    const data = req.body;
    req.body = data;
    next();
});