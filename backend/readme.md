Here’s a step-by-step guide to setting up MongoDB with an Express.js and Node.js server:

---

### **Step 1: Install Dependencies**

First, ensure you have Node.js installed. Then, create a new project and install the necessary packages.

```sh
mkdir my-express-app && cd my-express-app
npm init -y
npm install express mongoose dotenv
```

- `express`: Web framework for Node.js.
- `mongoose`: ODM (Object Data Modeling) library for MongoDB.
- `dotenv`: For managing environment variables.

---

### **Step 2: Setup MongoDB Connection**

#### **1. Create a `.env` file** in your project root:

```
MONGO_URI=mongodb://127.0.0.1:27017/mydatabase
PORT=5000
```

#### **2. Create a `db.js` file** to handle the database connection:

```js
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

### **Step 3: Create a User Schema**

#### **Create a `models/User.js` file**

```js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
```

---

### **Step 4: Setup Express Server**

#### **Create `server.js`**

```js
require("dotenv").config();
const express = require("express");
const connectDB = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", require("./routes/userRoutes"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

### **Step 5: Create User Routes**

#### **Create `routes/userRoutes.js`**

```js
const express = require("express");
const {
  createUser,
  getUser,
  updateUser,
  aggregateUsers,
} = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.get("/aggregate/role", aggregateUsers);

module.exports = router;
```

---

### **Step 6: Create User Controllers**

#### **Create `controllers/userController.js`**

```js
const User = require("../models/User");

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, age, role } = req.body;
    const newUser = new User({ name, email, age, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Aggregate users based on role
const aggregateUsers = async (req, res) => {
  try {
    const usersByRole = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } },
    ]);
    res.json(usersByRole);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, getUser, updateUser, aggregateUsers };
```

---

### **Step 7: Run the Server**

Start your Express.js server:

```sh
node server.js
```

Or with nodemon (if installed):

```sh
npx nodemon server.js
```

---

### **Testing the API**

Use Postman or `curl` to test:

#### **1. Create a User**

```sh
curl -X POST http://localhost:5000/api/users \
     -H "Content-Type: application/json" \
     -d '{"name":"John Doe", "email":"john@example.com", "age":30, "role":"admin"}'
```

#### **2. Get a User by ID**

```sh
curl -X GET http://localhost:5000/api/users/{userId}
```

#### **3. Update a User**

```sh
curl -X PUT http://localhost:5000/api/users/{userId} \
     -H "Content-Type: application/json" \
     -d '{"age":35}'
```

#### **4. Aggregate Users by Role**

```sh
curl -X GET http://localhost:5000/api/users/aggregate/role
```

---

This setup provides:

- MongoDB connection
- User schema
- Routes to create, get, update users
- Aggregation based on roles

Let me know if you need modifications or explanations! 🚀
