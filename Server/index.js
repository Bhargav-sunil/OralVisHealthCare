const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const allowedOrigin = https://oral-vis-health-care.vercel.app || "*";
app.use(cors({ origin: allowedOrigin, credentials: true }));

app.use(express.json());

require("./config/database");

const authRoutes = require("./routes/auth.routes");
const scanRoutes = require("./routes/scan.routes");

app.use("/api/auth", authRoutes);
app.use("/api/scans", scanRoutes);

app.get("/health", (_, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
