const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");

exports.register = async (req, res) => {
  try {
    console.log(req.body); // Log the incoming data

    const {
      first_name,
      last_name,
      username,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    // Check if the user already exists
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!validateLength(first_name, 3, 30)) {
      return res
        .status(400)
        .json({ message: "First name must be between 3 and 30 characters" });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res
        .status(400)
        .json({ message: "Last name must be between 3 and 30 characters" });
    }
    if (!validateLength(password, 6, 40)) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    // Create a new user
    const user = await new User({
      first_name,
      last_name,
      username: newUsername,
      email,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    res.status(201).json(user);
  } catch (err) {
    console.error("Error in register function:", err); // Log the error for debugging
    res.status(500).json({ message: err.message });
  }
};
