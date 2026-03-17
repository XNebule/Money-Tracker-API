require("dotenv").config();

const client = require("./config/dbase");
const app = require("./app");
const port = process.env.PORT;

const startServer = async () => {
  try {
    await client.connect();
    console.log("Database connected!");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Error starting server: ", err);
    process.exit(1);
  }
};

startServer();
