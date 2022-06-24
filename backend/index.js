const express = require("express");
const bodyparser = require("body-parser");

const PORT = process.env.PORT || 4001;
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const routes = require("./routes");
app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("hello amwell");
});

const CONNECTION_URL =
  "mongodb+srv://Amwell:Admin%40123@cluster0.mkfal.mongodb.net/?retryWrites=true&w=majority";

// app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
  })
  .catch((e) => {
    console.log(e.message);
  });
