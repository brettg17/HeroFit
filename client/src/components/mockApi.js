import { mockUsers } from './mockData'

export const mockSignup = (email, password) => {
  const userExists = mockUsers.some((user) => user.email === email);
  if (userExists) {
    return { success: false, message: 'User already exists' };
  } else {
    mockUsers.push({ id: mockUsers.length +1, email, password });
    return { success: true, message: 'Signup successful' };
  }
};

export const mockLogin = (email, password) => {
  const user = mockUsers.find((user) => user.email === email && user.password === password);
  if (user) {
    return { success: true, message: 'Login successful' };
  } else {
    return { success: false, message: 'Invalid email or password' };
  }
};