const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors());

// ⭐ SAVE USER
app.post("/submit", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Read old file
    let users = [];
    if (fs.existsSync("user.json")) {
      const data = fs.readFileSync("user.json", "utf8");
      users = JSON.parse(data || "[]");
    }

    // Add user
    const newUser = { name, email, password: hashedPassword };
    users.push(newUser);

    // Save file
    fs.writeFileSync("user.json", JSON.stringify(users, null, 2));

    res.json({ message: "User saved successfully!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ⭐ VIEW ALL USERS
app.get("/users", (req, res) => {
  try {
    if (!fs.existsSync("user.json")) {
      return res.json([]);
    }

    const data = fs.readFileSync("user.json", "utf8");
    const users = JSON.parse(data || "[]");

    res.json(users);

  } catch (err) {
    res.status(500).json({ message: "Could not read file" });
  }
});

// ⭐ RUN SERVER
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
