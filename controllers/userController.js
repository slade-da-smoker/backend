const User = require('../models/User'); // Make sure the correct path

// Fetch user by email
exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({email: req.params.email});

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      name: user.name,
      email: user.email,
      uniqueId: user.uniqueId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

