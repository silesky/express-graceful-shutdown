import express from "express";
const app = express();

const server = app.listen(3000);
// eslint-disable-next-line no-unused-vars
let timerId = null;

app.get("/", async (req, res) => {
  timerId = setTimeout(() => {
    console.log("timer expired!");
  }, 1000000);
  res.send("Hello World!");
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

/**
 * If an abort happens,
 * Error: socket hang up (happens either way)
 *
 * - Nobody is generally going to be awaiting our library to complete an HTTP request (this happens passively),
 * - But even if they were waiting, we don't resolve our promise until all the dispatches are complete.
 * - If we do force resolve and there are pending promises (like HTTP Requests),
 * - they wouldn't be promises whose resolution was blocking an end-user network request
 *   Those unresolved promise callbacks would just hang out on the job queue which will eventually get torn down.
 */
