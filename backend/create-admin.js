require("dotenv").config();
const crypto = require("crypto");
const mongoose = require("mongoose");

const User = require("./models/User");

const hashPassword = (password) =>
  crypto.createHash("sha256").update(password).digest("hex");

async function createAdmin() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing in .env");
  }

  await mongoose.connect(process.env.MONGO_URI);

  const admin = await User.findOneAndUpdate(
    { email: "admin" },
    {
      name: "Admin",
      email: "admin",
      password: hashPassword("admin"),
      role: "admin",
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  ).select("-password");

  await mongoose.disconnect();

  console.log("Admin account is ready:");
  console.log(admin);
  console.log("Login: admin");
  console.log("Password: admin");
}

createAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
