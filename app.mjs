import express from "express";
const app = express();

const server = app.listen(3000);
app.get("/", (req, res) => res.send("Hello World!"));

const onExit = async () => {
  server.close(() => processexit());
  setTimeout(() => {
    console.log("terminated after 1sec");
    process.exit(1);
  }, 1000);
};

process.on("SIGINT", onExit);
process.on("SIGTERM", onExit);
