const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const express = require("express");
const v1StudyRouter = require("./v1/routes/studyRoute");
const authRoutes = require('./v1/routes/authRoute');
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.send("<h2>It's Working!</h2>");
});

app.use(bodyParser.json());
app.use("/api/v1/study", v1StudyRouter);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
  V1SwaggerDocs(app, PORT);
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