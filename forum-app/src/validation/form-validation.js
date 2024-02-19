import validator from 'validator';

export const emailValidation = {
  required: {
    value: true,
    message: "Please enter an email address",
  },
  pattern: {
    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
    message: "Email address is not valid",
  },
};

export const passwordValidation = {
  required: {
    value: true,
    message: "Please enter password",
  },
  minLength: {
    value: 4,
    message: "Password must be at least 4 characters long",
  },
};

export const usernameValidation = {
  required: {
    value: true,
    message: 'Please enter username',
  },
  minLength: {
    value: 4,
    message: "Username must be at least 4 characters long",
  },
};

export const firstNameValidation = {
  required: {
    value: true,
    message: "Please enter name",
  },
  minLength: {
    value: 4,
    message: "First name must be at least 4 characters long",
  },
  maxLength: {
    value: 32,
    message: "First name must be at most 32 characters long",
  },
};

export const lastNameValidation = {
  required: {
    value: true,
    message: "Please enter name",
  },
  minLength: {
    value: 4,
    message: "Last name must be at least 4 characters long",
  },
  maxLength: {
    value: 32,
    message: "Last name must be at most 32 characters long",
  },
};

export const postTitleValidation = {
  required: {
    value: true,
    message: "Please enter post title",
  },
  minLength: {
    value: 16,
    message: "Title must be at least 16 characters long",
  },
  maxLength: {
    value: 64,
    message: "Title must be at most 64 characters long",
  },
};

export const postContentValidation = {
  required: {
    value: true,
    message: "Please enter post content",
  },
  minLength: {
    value: 32,
    message: "Content must be at least 32 characters long",
  },
  maxLength: {
    value: 8192,
    message: "Content must be at most 8192 characters long",
  },
};

export const urlValidation = (value) => {
  if (!value) return true;
  if (validator.isURL(value)) {
    return true;
  } else {
    return "Please enter a valid URL";
  }
}