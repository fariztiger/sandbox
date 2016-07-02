var http = require("http");
var fs = require("fs")

http.createServer(function(req, res){

  res.writeHead(200, { "Content-type" : "application/json" });

  var obj = {
    firstname: "John",
    surname: "Doe"
  };

  res.end(JSON.stringify(obj));
  // fs.createReadStream(__dirname + "/index.html").pipe(res);

}).listen(3000, "127.0.0.1" );
