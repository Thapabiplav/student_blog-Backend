const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

require("./database/connection");

app.use(cors());
app.use(express.json());

const path = require("path");
app.use("/storage", express.static(path.join(__dirname, "src/storage")));

const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");

app.use("/", userRoute);
app.use("/", blogRoute);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Project has started at ${PORT}`);
});
