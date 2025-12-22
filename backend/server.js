const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/donors", require("./routes/donorRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));
app.use("/api/donations", require("./routes/donationRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));
app.use("/api/camps", require("./routes/campRoutes"));
app.use("/api/transfers", require("./routes/transferRoutes"));

app.listen(5000, () => console.log("Backend running on port 5000"));
