export const fullnameRules = [
  {
    required: true,
    message: 'Fullname cannot be empty',
  },
  {
    type: 'string',
    message: 'Fullname must be valid',
  },
  {
    min: 3,
    message: 'Fullname must be at least 3 characters long',
  },
  {
    pattern: /^[\p{L}\s]+$/u,
    message: 'Fullname must not contain numbers or special characters',
  },
];

export const usernameRules = [
  {
    required: true,
    message: 'Username cannot be empty',
  },
  {
    type: 'string',
    message: 'Username must be valid',
  },
  {
    min: 3,
    max: 30,
    message: 'Username must be between 3 and 30 characters long',
  },
  {
    pattern: /^(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
    message: 'Username must not contain special characters except for _ and .',
  },
];

export const emailRules = [
  {
    required: true,
    message: 'Email cannot be empty',
  },
  {
    type: 'email',
    message: 'Email must be valid',
  },
];

export const passwordRules = [
  {
    required: true,
    message: 'Password cannot be empty',
  },
  {
    min: 6,
    message: 'Password must be at least 6 characters long',
  },
];

export const descriptionRules = [
  {
    max: 200,
    message: 'Description cannot exceed 200 characters',
  },
];

export const workspaceNameRules = [
  {
    required: true,
    message: 'Workspace name cannot be empty',
  },
  {
    min: 3,
    message: 'Workspace name must be at least 3 characters',
  },
  {
    max: 50,
    message: 'Workspace name cannot exceed 50 characters',
  },
];

export const projectNameRules = [
  {
    required: true,
    message: 'Project name cannot be empty',
  },
  {
    min: 3,
    message: 'Project name must be at least 3 characters',
  },
  {
    max: 50,
    message: 'Project name cannot exceed 50 characters',
  },
];
