const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
      //send new token
      const token = 'JWT_TOKEN';

      return res.status(200).json({
        userDetails: {
          email: user.email,
          token: token,
          username: user.username,
        },
      });
    }

    return res.status(400).send('Invalid credentials. Please try again.');
  } catch (err) {
    return res.status(500).send('Something went wrong. Please try again');
  }
};

module.exports = postLogin;
