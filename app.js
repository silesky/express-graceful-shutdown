const express = require("express");

const app = express();
const PORT = 3000;

app.listen(PORT, (error) => {
  console.log("Error occurred, server can't start", error);
});
