const express = require("express");
const morgan = require("morgan")("short");
const apiRouter = require("./routes/api");

const app = express();

app.use(morgan);
app.use("/api/v1", apiRouter);

app.use((req, res, next) => {
  res.status(404).json({msg: "Sorry can't find that!"})
});

app.listen(process.env.PORT || 80);
