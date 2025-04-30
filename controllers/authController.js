require('dotenv').config(); 
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Counter = require('../models/Counter');



async function getNextSequence(name) {
  const counter = await Counter.findByIdAndUpdate(
    name,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

function buildUniqueId({ userType, faculty, admissionYear, department, counter }) {
  const prefix = 'FUK';
  const type = userType.toUpperCase();
  const facultyCode = faculty.toUpperCase().slice(0, 3);
  const year = admissionYear.toString().slice(-2);
  const deptCode = department.toUpperCase().slice(0, 3);
  return `${prefix}${type}/${facultyCode}/${year}/${deptCode}/${counter}`;
}

exports.signup = async (req, res) => {
  try {
    const { username, email, password, userType, faculty, admissionYear, department } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const counter = await getNextSequence('userId');
    const uniqueId = buildUniqueId({ userType, faculty, admissionYear, department, counter });

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      userType,
      faculty,
      admissionYear,
      department,
      uniqueId,
    });

    await newUser.save();

    res.status(201).json({ message: 'Signup successful', uniqueId, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

