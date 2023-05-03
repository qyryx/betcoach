import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {secret} from '../config.js';
import {createUser, getUserByUsername} from '../db/user.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res.status(400).json({ message: 'Invalid input' });
    }
    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    user.token = jwt.sign(
        {user_id: user._id},
        secret,
        {
          expiresIn: "1h",
        }
    );
    user.password = undefined;

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Bad request' });
  }
};

export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!(email && username && password)) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const oldUser = await getUserByUsername(username);

    if (oldUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = await createUser({
      username,
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 10),
    });

    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Bad request' });
  }
}
