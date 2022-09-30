import express from "express";
const app = express();

const server = app.listen(3000);
app.get("/", (req, res) => res.send("Hello World!"));

const onExit = () => {
  setTimeout(async () => {
    await analytics.closeAndFlush(); // flush all existing events
    server.close(() => process.exit());
  }, 0);
};

process.on("SIGINT", onExit);
process.on("SIGTERM", onExit);
