module.exports = {
  apps : [{
    name   : "server",
    script : "./dist/bin/http.js",
    exec_mode: "cluster",
    instances: 2,
  }]
}
