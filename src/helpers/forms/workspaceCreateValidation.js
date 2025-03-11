export const titleRules = [
  {
    required: true,
    message: 'Title cannot be empty',
  },
  { type: 'string', message: 'Title must be valid' },
  { max: 25, message: 'Title must be less than 25 characters' },
];
