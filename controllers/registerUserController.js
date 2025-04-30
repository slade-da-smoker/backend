const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, faculty, department, year, type } = req.body;
    // userType is 'U' or 'D'

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Count how many users already exist to get the incremental number
    const userCount = await User.countDocuments();

    const incrementalCounter = String(userCount + 1).padStart(3, '0'); // 001, 002, etc.

    // Extract last two digits of year
    const yearShort = year.toString().slice(-2);

    // Build the unique ID
    const uniqueIdNumber = `FUK${type}/${faculty}/${yearShort}/${department}/${incrementalCounter}`;

    // Create user
    const newUser = new User({
      name,
      email,
      password,
      faculty,
      department,
      year,
      type,
      uniqueIdNumber
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', uniqueIdNumber });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
