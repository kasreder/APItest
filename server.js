const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const https = require('https');
const fs = require('fs');

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8000"
// };

app.use(cors());

const options = {
  key: fs.readFileSync("./app/config/localhost+1-key.pem",'utf-8'),
  cert: fs.readFileSync("./app/config/localhost+1.pem",'utf-8'),
};

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// // https 의존성으로 certificate와 private key로 새로운 서버를 시작
// https.createServer(options, app).listen(8000, () => {
//   console.log(`HTTPS server started on port 8000`);
// });
