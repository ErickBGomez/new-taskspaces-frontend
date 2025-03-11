export const titleRules = [
  { required: true, message: 'Title is required' },
  { type: 'string', message: 'Title must be a string' },
  {
    min: 3,
    max: 25,
    message: 'Title must be between 3 and 25 characters long',
  },
];

export const iconRules = [
  { type: 'string', message: 'Icon must be a string', required: false },
];

export const connectedToGoogleDriveRules = [
  {
    type: 'boolean',
    message: 'Connected to Google Drive must be a boolean',
    required: false,
  },
];
