const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Route mounting
app.use("/api/receptionist", require("./routes/receptionist"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/doctor", require("./routes/doctorRoutes"));
// app.use("/api/labtech", require("./routes/labtech"));
// app.use("/api/pharmacist", require("./routes/pharmacist"));

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
