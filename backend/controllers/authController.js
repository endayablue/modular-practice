// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

// Callback function for user registration
const registerUser = async (req, res) => {
  const {
    username,
    firstName,
    lastName,
    email,
    password,
    birthday,
    height,
    weight,
  } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      birthday,
      height,
      weight,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

// Callback function for user login
async function loginUser(req, res) {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      // If the user doesn't exist, return an error
      if (!user) {
        return res
          .status(401)
          .json({ error: "User not found. Please check your email." });
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      // If the passwords don't match, return an error
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ error: "Invalid password. Please check your password." });
      }
  
      // If email and password are correct, generate a JWT token
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email, // Include email in the token payload
          username: user.username, // Include username in the token payload
          firstName: user.firstName, // Include first name in the token payload
          lastName: user.lastName, // Include last name in the token payload
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "10h", // Set the expiration time for the token (adjust as needed)
        }
      );
  
      // Send the token in the response
      res.json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Login failed. Please try again later." });
    }
  }

module.exports = {
  loginUser, // Export the loginUser callback
  registerUser, // Export the registerUser callback
};
