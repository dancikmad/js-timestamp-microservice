// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function validateDate(date) {
  const pattern = /^(19|20)\d{2}[-/](0[1-9]|1[0-2])[-/](0[1-9]|[12]\d|3[01])$/;
  return pattern.test(date);
}


// your first API endpoint...
app.get("/api/:date?", (req, res) => {
  const inputDate = req.params.date;
  let date;

  // Check if `inputDate` is provided; if not, use the current date
  if (!inputDate) {
    date = new Date();
  } else {
    // Parse as a Unix timestamp if it's all digits; otherwise, parse as a date string
    date = !isNaN(inputDate) ? new Date(Number(inputDate)) : new Date(inputDate);
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return JSON response with `unix` and `utc` fields
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
