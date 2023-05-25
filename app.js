const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(4000, () => {
      console.log("listening on port 4000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const contactsRouter = require("./routes/contacts");

app.use(express.json());
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found (error 404)" });
});

app.use(({ status, message }, req, res, next) => {
  res.status(status || 500).json({ message: message });
});
