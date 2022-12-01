import http from 'http';
import { app } from '../app';
import { server_config } from '../config';

// 设置ip和端口
const hostname = process.env.HOST || server_config.host;
const port = process.env.PORT || server_config.port;
app.set('port', port);
if(hostname !== 'localhost'){
    app.set('host', hostname);  // 设置指定IP
}

// 创建服务器
http.createServer(app).listen(port);

console.log(`Server running at http://${hostname}:${port}/`);
