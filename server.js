const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

dotenv.config();
app.use(express.json());
app.use(cors());

// Routes
app.use("/", userRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
