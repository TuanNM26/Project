export const validatePassword = (_, value, form) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  const passwordErrorMessage =
    'Password must be at least 8 characters long, contain at least one uppercase letter, and include at least one special character.';

  const { getFieldValue } = form;
  if (!value) {
    return Promise.reject(new Error('Passwords not empty.'));
  }
  if (value && !passwordRegex.test(value)) {
    return Promise.reject(new Error(passwordErrorMessage));
  }
  if (value && value !== getFieldValue('password')) {
    return Promise.reject(new Error('Passwords do not match.'));
  }
  return Promise.resolve();
};
