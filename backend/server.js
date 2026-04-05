const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const createDefaultHR = async () => {
  try {
    const existingHR = await User.findOne({ email: "hrsairam@gmail.com" });

    if (!existingHR) {
      const hashedPassword = await bcrypt.hash("123456", 10);

      await User.create({
        name: "sairam",
        email: "hrsairam@gmail.com",
        password: hashedPassword,
        role: "HR"
      });

      console.log("Default HR created successfully");
    } else {
      console.log("Default HR already exists");
    }
  } catch (error) {
    console.error("Error creating default HR:", error.message);
  }
};

createDefaultHR();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/candidates", require("./routes/candidateRoutes"));

app.get("/", (req, res) => {
  res.send("Candidate Shortlisting API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});