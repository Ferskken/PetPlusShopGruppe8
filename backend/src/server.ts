import "dotenv/config";
import app from "./app/app";

const Koa = require('koa');
const http = require('http');
const https = require('https');
const fs = require('fs');

// Start the server on PORT 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

  const secretKey = process.env.SECRET;

});
//reading keys created by example given by chatgpt
//question: How to generate self signed ssl certified using openssl?
const options = {
  key: fs.readFileSync(process.cwd() + '/keys/server.key','utf8').toString(),
  cert: fs.readFileSync(process.cwd() + '/keys/server.crt','utf8').toString(),
};

const httpsServer = https.createServer(options, app.callback());

const HTTPS_PORT = process.env.HTTPS_PORT || 8443;

httpsServer.listen(HTTPS_PORT, () => {
  console.log(`HTTPS server listening on port ${HTTPS_PORT}`);
});
