const express = require("express"),
  compression = require("compression"),
  cookieParser = require("cookie-parser"),
  cors = require("cors");

const port = 3000,
  distFolder = "dist",
  assetPrefix = "";

const app = express();
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use("/", express.static(distFolder));

app.get(`${assetPrefix}*`, function(req, res) {
  res.sendFile(`${distFolder}${assetPrefix}/index.html`, {
    root: __dirname
  });
});

app.listen(port, function() {
  console.log(`App is listening on port ${port}!`);
});
