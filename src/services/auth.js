import jwt from 'jsonwebtoken';
import { users } from '@/db/user';

const SECRET_KEY = 'your_secret_key';

export const signUpUser = async (formData) => {
  // Convert FormData to a plain object
  const body = {};
  formData.forEach((value, key) => {
    body[key] = value;
  });

  const { email, username, password } = body;

  // Check if password exists and has a valid length
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }

  const existingUser = users.find(user => user.email === email || user.username === username);

  if (existingUser) {
    throw new Error('Email or username already exists');
  }

  // Add new user to the "database"
  users.push({ email, username, password, photo: body.photo });

  // Generate JWT token
  try {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    console.log('jsonwebtoken:', jwt);
console.log('SECRET_KEY:', SECRET_KEY);

    return token;
  } catch (error) {
    console.error('JWT signing error:', error);
    throw new Error('Failed to generate token');
  }
};
