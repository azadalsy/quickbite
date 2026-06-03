const crypto = require("crypto");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const User = require("./models/User");
const Food = require("./models/Food");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "quickbite-demo-secret";
const MONGO_URI = process.env.MONGO_URI;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  })
);
app.use(express.json());

const hashPassword = (password) =>
  crypto.createHash("sha256").update(password).digest("hex");

const createToken = (user) => {
  const payload = {
    id: user._id.toString(),
    role: user.role || "customer",
    exp: Date.now() + 1000 * 60 * 60 * 24,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url"
  );
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(encodedPayload)
    .digest("base64url");

  return `${encodedPayload}.${signature}`;
};

const verifyToken = (token) => {
  if (!token || !token.includes(".")) return null;

  const [encodedPayload, signature] = token.split(".");
  const expectedSignature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(encodedPayload)
    .digest("base64url");

  if (signature !== expectedSignature) return null;

  const payload = JSON.parse(
    Buffer.from(encodedPayload, "base64url").toString("utf8")
  );

  if (payload.exp < Date.now()) return null;

  return payload;
};

const authRequired = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const user = verifyToken(token);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  req.user = user;
  next();
};

const adminRequired = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};

if (!MONGO_URI) {
  console.error("MONGO_URI is missing. Add it to your .env file.");
} else {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log("MONGO ERROR:");
      console.error(err);
    });
}

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "QuickBite Backend Running",
    architecture: ["React frontend", "Express backend", "MongoDB database"],
  });
});

app.get("/foods", async (req, res) => {
  try {
    const {
      category,
      search,
      sort = "name",
      order = "asc",
      page = 1,
      limit = 12,
    } = req.query;

    const filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const pageNumber = Math.max(Number(page), 1);
    const pageSize = Math.min(Math.max(Number(limit), 1), 50);
    const skip = (pageNumber - 1) * pageSize;
    const sortDirection = order === "desc" ? -1 : 1;

    const [foods, total] = await Promise.all([
      Food.find(filter)
        .sort({ [sort]: sortDirection })
        .skip(skip)
        .limit(pageSize),
      Food.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: foods,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
        limit: pageSize,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/foods", authRequired, adminRequired, async (req, res) => {
  try {
    const { name, price, category = "Meals", image = "" } = req.body;

    if (!name || Number(price) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Food name and valid price are required",
      });
    }

    const food = await Food.create({
      name: name.trim(),
      price: Number(price),
      category,
      image,
    });

    res.status(201).json({
      success: true,
      food,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put("/foods/:id", authRequired, adminRequired, async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedFood) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.json({
      success: true,
      food: updatedFood,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.delete("/foods/:id", authRequired, adminRequired, async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);

    if (!deletedFood) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.json({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role = "customer" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const userCount = await User.countDocuments();
    const assignedRole = userCount === 0 ? "admin" : role;

    const user = await User.create({
      name: name.trim(),
      email: email.trim(),
      password: hashPassword(password),
      role: assignedRole,
    });

    const token = createToken(user);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "customer",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.trim(),
      password: hashPassword(password),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = createToken(user);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "customer",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.post("/password-reset", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email and new password are required",
      });
    }

    const user = await User.findOneAndUpdate(
      { email: email.trim() },
      { password: hashPassword(newPassword) },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get("/profile", authRequired, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
