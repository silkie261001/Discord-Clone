const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //check if user exists
    const userExists = await User.exists({ email });

    if (userExists) {
      return res.status(409).send('This Email already exists.');
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    //create user document and save in database
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: '24h',
      }
    );

    res.status(201).json({
      userDetails: {
        email: user.email,
        token: token,
        username: user.username,
      },
    });
  } catch (err) {
    return res.status(500).send('Error occured. Please try again.');
  }
};

module.exports = postRegister;
