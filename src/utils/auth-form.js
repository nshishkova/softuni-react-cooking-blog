// Shared helpers for the Login and Register forms.

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Supabase rejects passwords shorter than 6 characters
export const minPasswordLength = 6;

export function validateEmail(email) {
  if (!email.trim()) {
    return "Email is required.";
  }

  if (!emailPattern.test(email.trim())) {
    return "Please enter a valid email address.";
  }

  return null;
}

export function validateRegister(values) {
  const errors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = "Display name is required.";
  } else if (name.length < 2 || name.length > 30) {
    errors.name = "Display name must be between 2 and 30 characters.";
  }

  const emailError = validateEmail(values.email);
  if (emailError) {
    errors.email = emailError;
  }

  if (values.password.length < minPasswordLength) {
    errors.password = `Password must be at least ${minPasswordLength} characters.`;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}
