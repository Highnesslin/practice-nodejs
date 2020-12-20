var http = require("http");
http
  .createServer(function (request, response) {
    response.end(`
        <html>
            Html Update Time${Date.now()}
        </html>
    `);
  })
  .listen(8081);

console.log("Server running at http://127.0.0.1:8081/");

const updateTime = () => {
  //
};
