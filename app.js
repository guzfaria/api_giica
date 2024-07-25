const dotenv = require('dotenv');
const express = require("express");
const bodyParser = require('body-parser');
const v1StudyRouter = require("./src/v1/routes/studyRoutes");
const authRoutes = require('./src/v1/routes/authRoutes');
const sequelize = require('./config/database');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.use(bodyParser.json());

app.use("/api/v1", v1StudyRouter);
app.use('/api/auth', authRoutes);

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