const express = require("express");
const morgan = require("morgan")("short");
const apiRouter = require("./routes/api");

const app = express();

app.use(morgan);
app.use("/api/v1", apiRouter);

app.listen(3000);
