import 'dotenv/config'; 
const express = require("express");

const v1Router = require("./v1/routes/studyRoutes");

const app = express();
const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.send("<h2>It's Working!</h2>");
});


app.use("/api/v1", v1Router);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});

/* const http = require('http');
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('server.key'), //chaves presentes no serv giica já que irá ser usado a base giica.com.br
  cert: fs.readFileSync('server.crt')
};

const httpsServer = https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello, world!');
});

const httpServer = http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
});

httpServer.listen(80);
httpsServer.listen(443); */