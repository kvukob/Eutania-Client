const express = require("express");
const port = process.env.PORT || 8080;
const cors = require("cors");
const app = express();

app.use(express.static(__dirname + "/dist/"));
app.use(cors());
app.get(/.*/, function (req, res) {
  res.sendfile(__dirname + "/dist/index.html");
});
app.listen(port);

console.log("started");
