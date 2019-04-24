const express = require("express");

const router = express.Router();

router.get("/timestamp/", (req, res, next) => {
  const timestamp = new Date();
  const unix = timestamp.getTime();
  const utc = timestamp.toUTCString();
  res.status(200).json({ unix, utc });
});

router.get("/timestamp/:date_string", (req, res, next) => {
  const { date_string: dateString } = req.params;
  const isUnixTS = /^\d+$/.test(dateString);
  const isDateStr = /^\d{4}-\d{1,2}-\d{1,2}$/.test(dateString);

  if (!isUnixTS && !isDateStr) {
    res.status(400).json({ error: "Invalid Date format" });
    return;
  }

  const dateInput = isUnixTS ? parseInt(dateString, 10) : dateString;
  const date = new Date(dateInput);

  const isValidDate = !isNaN(date.getTime());
  if (!isValidDate) {
    res.status(422).json({ error: `${dateInput} should be in YYYY-MM-DDD format` });
    return;
  }

  const unix = date.getTime();
  const utc = date.toUTCString();
  res.status(200).json({ unix, utc });
});

module.exports = router;
