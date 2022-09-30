import express from "express";
const app = express();

const server = app.listen(3000);
app.get("/", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  res.send("Hello World!");
});

const onExit = async () => {
  console.log("exiting...");
  server.close(() => process.exit());
  setTimeout(() => {
    console.log("Force exiting!");
    process.exit(1);
  }, 1000);
};

process.on("SIGINT", onExit);
process.on("SIGTERM", onExit);
