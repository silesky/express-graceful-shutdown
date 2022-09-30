import express from "express";
const app = express();

const server = app.listen(3000);
// eslint-disable-next-line no-unused-vars
let timerId = null;

app.get("/", async (req, res) => {
  timerId = setTimeout(() => {
    console.log("timer expired!");
  }, 1000000);
  res.send(`Hello World! with timer ${timerId}`);
});

const onExit = async () => {
  console.log("closing server...");
  server.close(() => {
    console.log("closed gracefully!");
    process.exit();
  });
  setTimeout(() => {
    console.log("Force closing!");
    process.exit(1);
  }, 2000);
};

process.on("SIGINT", onExit);
process.on("SIGTERM", onExit);
