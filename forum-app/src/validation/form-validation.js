import validator from 'validator';

/**
 * Email validation object.
 *
 * @typedef {Object} emailValidation
 * @property {Object} required - Required validation rule.
 * @property {boolean} required.value - Indicates if the email is required.
 * @property {string} required.message - Error message for missing email.
 * @property {Object} pattern - Pattern validation rule.
 * @property {RegExp} pattern.value - Regular expression pattern for email validation.
 * @property {string} pattern.message - Error message for invalid email format.
 */
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

/**
 * Password validation object.
 *
 * @typedef {Object} passwordValidation
 * @property {Object} required - Required validation rule.
 * @property {boolean} required.value - Indicates if the email is required.
 * @property {string} required.message - Error message for missing email.
 * @property {Object} pattern - Pattern validation rule.
 * @property {RegExp} pattern.value - Regular expression pattern for email validation.
 * @property {string} pattern.message - Error message for invalid email format.
 */
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

/**
 * Username validation object.
 *
 * @typedef {Object} usernameValidation
 * @property {Object} required - Required validation rule.
 * @property {boolean} required.value - Indicates if the email is required.
 * @property {string} required.message - Error message for missing email.
 * @property {Object} pattern - Pattern validation rule.
 * @property {RegExp} pattern.value - Regular expression pattern for email validation.
 * @property {string} pattern.message - Error message for invalid email format.
 */
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

/**
 * First Name validation object.
 *
 * @typedef {Object} firstNameValidation
 * @property {Object} required - Required validation rule.
 * @property {boolean} required.value - Indicates if the email is required.
 * @property {string} required.message - Error message for missing email.
 * @property {Object} pattern - Pattern validation rule.
 * @property {RegExp} pattern.value - Regular expression pattern for email validation.
 * @property {string} pattern.message - Error message for invalid email format.
 */
export const firstNameValidation = {
  required: {
    value: true,
    message: "Please enter name",
  },
  minLength: {
    value: 3,
    message: "First name must be at least 3 characters long",
  },
  maxLength: {
    value: 32,
    message: "First name must be at most 32 characters long",
  },
};

/**
 * Last Name validation object.
 *
 * @typedef {Object} lastNameValidation
 * @property {Object} required - Required validation rule.
 * @property {boolean} required.value - Indicates if the email is required.
 * @property {string} required.message - Error message for missing email.
 * @property {Object} pattern - Pattern validation rule.
 * @property {RegExp} pattern.value - Regular expression pattern for email validation.
 * @property {string} pattern.message - Error message for invalid email format.
 */
export const lastNameValidation = {
  required: {
    value: true,
    message: "Please enter name",
  },
  minLength: {
    value: 3,
    message: "Last name must be at least 3 characters long",
  },
  maxLength: {
    value: 32,
    message: "Last name must be at most 32 characters long",
  },
};

/**
 * Post Title validation object.
 *
 * @typedef {Object} postTitleValidation
 * @property {Object} required - Required validation rule.
 * @property {boolean} required.value - Indicates if the email is required.
 * @property {string} required.message - Error message for missing email.
 * @property {Object} pattern - Pattern validation rule.
 * @property {RegExp} pattern.value - Regular expression pattern for email validation.
 * @property {string} pattern.message - Error message for invalid email format.
 */
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

/**
 * Post Content validation object.
 *
 * @typedef {Object} postContentValidation
 * @property {Object} required - Required validation rule.
 * @property {boolean} required.value - Indicates if the email is required.
 * @property {string} required.message - Error message for missing email.
 * @property {Object} pattern - Pattern validation rule.
 * @property {RegExp} pattern.value - Regular expression pattern for email validation.
 * @property {string} pattern.message - Error message for invalid email format.
 */
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

/**
 * Validates a URL.
 * @param {string} value - The URL to be validated.
 * @returns {(boolean|string)} - Returns true if the URL is valid, otherwise returns an error message.
 */
export const urlValidation = (value) => {
  if (!value) return true;
  if (validator.isURL(value)) {
    return true;
  } else {
    return "Please enter a valid URL";
  }
}