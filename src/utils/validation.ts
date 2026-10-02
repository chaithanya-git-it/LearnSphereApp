export interface ValidationResult {
  isValid: boolean;
  emailError?: string;
  passwordError?: string;
}

export const validateEmail = (email: string): string | undefined => {
  if (!email || email.trim() === '') {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password || password.trim() === '') {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  return undefined;
};
