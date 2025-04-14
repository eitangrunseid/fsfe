const http = require('http')
http.createServer(function (req, res) {
res.write("on the way to be a fullstack");
res.end();

}
).listen(3000)
console.log("server started!")
