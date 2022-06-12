require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgarBody = require("morgan-body");

const dbConnectNosql = require("./config/mongo");
const { dbConnectPostgress } = require("./config/mysql");
const loggerStream = require("./utils/HandleLogger");
const app = express();
const ENGINE_DB = process.env.ENGINE_DB;
app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

morgarBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 400;
  },
});

const port = process.env.PORT || 3000;
// Aqui incvocamos rutas

app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(`Tu app esta lista por el puerto: ${port}`);
});
ENGINE_DB === "nosql"
  ? dbConnectNosql()
  : dbConnectPostgress();
