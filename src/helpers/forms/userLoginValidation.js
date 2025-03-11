export const emailRules = [
  {
    required: true,
    message: 'Email is required',
  },
  {
    type: 'email',
    message: 'Email must be a valid email address',
  },
];

export const passwordRules = [
  {
    required: true,
    message: 'Password is required',
  },
];
