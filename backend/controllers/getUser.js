const User = require('../models/User'); // Import your User model

async function getUser(req, res) {
  try {
    const userId = req.user.userId; // Updated to use "userId" from JWT payload
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthday: user.birthday,
      height: user.height,
      weight: user.weight,
      __v: user.__v,
    };

    res.status(200).json(userWithoutPassword); // Reply with the user document in a JSON packet
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error.' });
  }
}

module.exports = getUser;