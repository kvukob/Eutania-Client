const express = require("express");
const port = process.env.PORT || 8080;
const cors = require("cors");
const app = express();

app.use(express.static(__dirname + "/dist/"));
app.use(cors());
app.get(/.*/, function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  res.sendfile(__dirname + "/dist/index.html");
});
app.listen(port);

console.log("startedok");
