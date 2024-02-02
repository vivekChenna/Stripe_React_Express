const express = require("express");
const app = express();
require("dotenv").config();



const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello this is the home page");
});

app.listen(PORT, () => {
  console.log(`server running successfully at ${PORT}`);
});
