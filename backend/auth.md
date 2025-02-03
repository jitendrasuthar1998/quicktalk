### **1. `signup` (User Registration)**

**Purpose:** Registers a new user.

**How it works:**

- Extracts `fullName`, `email`, and `password` from `req.body`.
- Validates that all fields are provided and ensures the password is at least 6 characters long.
- Checks if a user with the same email already exists in the database.
- Hashes the password using `bcrypt`.
- Creates a new `User` instance with the hashed password.
- Generates a JWT token using `generateToken(newUser._id, res)`.
- Saves the new user in the database.
- Returns the user data in the response (excluding the password).

**Possible errors handled:**

- Missing fields.
- Email already registered.
- Password too short.
- Server errors.

---

### **2. `login` (User Authentication)**

**Purpose:** Logs in an existing user.

**How it works:**

- Extracts `email` and `password` from `req.body`.
- Finds the user by email in the database.
- If no user is found, returns an "Invalid credentials" error.
- Compares the entered password with the hashed password stored in the database.
- If the password matches, generates a JWT token.
- Returns user details in the response.

**Possible errors handled:**

- Incorrect email or password.
- Server errors.

---

### **3. `logout` (User Logout)**

**Purpose:** Logs out the user by clearing the authentication cookie.

**How it works:**

- Clears the JWT cookie by setting it to an empty string with `maxAge: 0`.
- Sends a success response.

**Possible errors handled:**

- Server errors.

---

### **4. `updateProfile` (Update User Profile Picture)**

**Purpose:** Updates the user's profile picture.

**How it works:**

- Extracts `profilePic` from `req.body` and `userId` from `req.user._id` (assumes authentication middleware).
- Validates if a profile picture is provided.
- Uploads the image to Cloudinary.
- Updates the user's `profilePic` field in the database.
- Returns the updated user data.

**Possible errors handled:**

- Missing profile picture.
- Cloudinary upload failure.
- Database update failure.

---

### **5. `checkAuth` (Check if User is Authenticated)**

**Purpose:** Returns the authenticated user's data.

**How it works:**

- Assumes `req.user` contains the authenticated user's data (populated by middleware).
- Returns the user data.

**Possible errors handled:**

- Server errors.

---

### **Summary**

| Function        | Purpose                          | Key Operations                                                                     |
| --------------- | -------------------------------- | ---------------------------------------------------------------------------------- |
| `signup`        | Register a new user              | Validate input, check for existing user, hash password, create user, generate JWT. |
| `login`         | Authenticate user & generate JWT | Find user, compare password, generate JWT.                                         |
| `logout`        | Clear authentication session     | Remove JWT cookie.                                                                 |
| `updateProfile` | Update user's profile picture    | Upload image to Cloudinary, update user record.                                    |
| `checkAuth`     | Verify authentication status     | Return user data from `req.user`.                                                  |
