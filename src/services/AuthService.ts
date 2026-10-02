export interface User {
  email: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

const MOCK_EMAIL = 'demo@learnsphere.com';
const MOCK_PASSWORD = 'password123';

/**
 * Simulates remote authentication request.
 * Demo credentials: demo@learnsphere.com / password123
 */
export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 800));

  const cleanEmail = email.trim().toLowerCase();

  if (cleanEmail === MOCK_EMAIL && password === MOCK_PASSWORD) {
    return {
      user: {
        email: cleanEmail,
        name: 'Senior Developer',
      },
      token: 'mock_jwt_token_learnsphere_senior_mobile_dev',
    };
  }

  throw new Error('Invalid email or password. Use demo credentials in README.');
};

export const AuthService = {
  login,
};
