# Express + TypeScript

## 1 相关模块安装
- npm install express --save    //安装express
- npm install body-parser --save

- npm install typescript ts-node @types/node @types/express --save-dev  //安装typescript编译环境
- npx tsc --init        // 初始化tsconfig.json

### 1.1 tsconfig.json配置
- "outDir": "./dist",   // 编译后的文件目录
- "rootDir": "./src",   // 源文件目录
- 配置参考：https://www.tslang.cn/docs/handbook/compiler-options.html

## 2 项目目录结构
├── EXPRESS-TS
    ├── dist            // 编译后的文件
    ├── public          // 静态资源
    ├── src             // 源码
        ├── bin         // 启动文件
            ├── http.ts // http启动文件
        ├── common      // 公共文件
        ├── models      // 数据库模型
        ├── routes      // 路由
        ├── app.ts      // 入口文件
        ├── config      // 配置文件

## 3 编译项目
- npx tsc

## 4 运行项目
- node dist/bin/http.js

## 5 调试ts代码

### 5.1 package.json调试配置
```
"scripts": {
    "start": "ts-node src/app.ts"
}
```

### 5.2 VSCode调试配置
- 运行和调试 -> 创建launch.json文件 -> 选择Node.js
```
{
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "启动程序",
            "runtimeArgs": [
                "--nolazy",
                "-r",
                "ts-node/register"
            ],
            "args": [
                "${workspaceRoot}/src/app/app.ts"
            ],
            "env": { "TS_NODE_PROJECT": "tsconfig.json" },
            "sourceMaps": true,
            "cwd": "${workspaceRoot}",
            "protocol": "inspector",
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen"
        }
    ]
}
```

## 6 pm2部署
- npm install pm2 --save
- pm2 init simple

### 6.1 pm2 ecosystem.config.js配置
```
module.exports = {
  apps : [{
    name   : "server",
    script : "./dist/app.js",
    exec_mode: "cluster",
    instances: 2,
  }]
}
```

### 6.2 pm2常用命令
- pm2 start ecosystem.config.js  // 启动
- pm2 list           // 查看进程列表
- pm2 show 0         // 查看进程详情
- pm2 log 0          // 查看进程日志
- pm2 flush          // 清空日志


## 7 mocha单元测试
- npm install mocha @types/mocha --save-dev  // 安装mocha
- npm install chai @types/chai --save-dev    // 安装chai
- npm install supertest @types/supertest --save-dev  // 安装supertest

- npm install tsconfig-paths --save-dev     // 安装tsconfig-paths
- npm install cross-env --save-dev          // 安装cross-env

### 7.1 测试目录结构
├── EXPRESS-TS
    ├── test                // 测试文件
        ├── unit            // 单元测试
        ├── .mocha.js       // mocha配置文件
        ├── tsconfig.json   // 测试tsconfig.json

### 7.2 tsconfig.json配置
```
{
    "exclude": [
    "node_modules",
    "test"
    ]
}
```

### 7.3 tsconfig.test.json配置
```
{
    "extends": "../tsconfig.json",
    "ts-node": {
        "transpileOnly": true
    }
}
```

### 7.4 .mocha.json配置
```
{
    "require": [
      "ts-node/register",
      "tsconfig-paths/register"
    ],
    "ui": "bdd"
}
```

### 7.5 package.json配置
```
"scripts": {
    "test": "cross-env TS_NODE_PROJECT=./test/tsconfig.test.json mocha --config ./test/.mocha.json test/unit/index.test.ts --exit",
    "test-all": "cross-env TS_NODE_PROJECT=./test/tsconfig.test.json mocha --config ./test/.mocha.json test/unit/*.test.ts"
}
```