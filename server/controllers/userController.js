/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */
import jwt from 'jsonwebtoken';
import { isEmail } from 'validator';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

require('dotenv').config();

// const { User } = Model;

export default class UserController {

	static async signUp(req, res) {
    const {
      email, password, name, username, role
    } = req.body

    if (!isEmail(email) || !password || !name || !role || !username) {
      return res.status(400).json({
        message: 'All fields are required',
        status: 'error',
      });
    }
    console.log(User, ")))))))))))))))))))))))))))))))))))))))0")
    await User.findOne({ where: { email: req.body.email.trim().toLowerCase() } })
    .then((userExists) => {
      if (userExists) {
        return res.status(400).json({
          status: 'error',
          message: 'Account exists'
        });
      }
    });

    const hash = bcrypt.hashSync(password, 10);
    User.create({
      name,
      username,
      email: email.trim().toLowerCase(),
      password: hash,
      role
    }).then((user) => {
      const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '24h' });
      return res.status(201).json({
        status: 'success',
        message: 'User created and logged in',
        token,
        user: {
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role
        },
      });
		});
  } 

   static signin(req, res) {
    const { email, password } = req.body;
    User.findOne({ where: { email: email.trim().toLowerCase() } })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            status: 'error',
            message: 'Email or Password Incorrect'
          });
        }
        const correctPassword = bcrypt.compareSync(password, user.password);
        if (!correctPassword) {
          return res.status(401).json({
            status: 'error',
            message: 'Email or Password Incorrect'
          });
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '24h' });

        return res.set('Authorization', `Bearer ${token}`)
        .status(200).json({
          status: 'success',
          message: 'Logged in',
          token,
          user: {
            id: user.id,
            email: user.email,
          }
        });
      });
  }
}