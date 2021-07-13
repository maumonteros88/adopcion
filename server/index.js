const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

const appRoutes = require("./routes/routes");

const PORT = process.env.PORT || 3004;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.options("*", cors());
app.use("/api", appRoutes);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server is up and listening on PORT:", PORT);
});
