import app from './app';
import mongoose from 'mongoose';
import config from './config';
import { Server } from 'http';

let server:Server

async function main() {
  try {
    await mongoose.connect(config.Database_Url);
    server = app.listen(config.PORT, () => {
      console.log(`Example app listening on port ${config.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();


process.on("unhandledRejection", () => {
  console.error("Unhandled Rejection detected")
  // If a server instance exists, close it gracefully
  if (server) {
    server.close(() => {
      console.log("Server closed due to an unhandled promise rejection.");
      process.exit(1); // Exit the process with an error code
    });
  } else {
    process.exit(1); // Exit the process immediately if no server is running
  }
});

process.on("uncaughtException", () => {
  console.error("Uncaught Exception:");
  process.exit(1); // Exit the process with an error code
});

// This will throw a ReferenceError since `x` is not defined
// console.log(x);