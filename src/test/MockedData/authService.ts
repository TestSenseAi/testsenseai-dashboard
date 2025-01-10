export const login = async (username: string, _password: string) => {
  // Simulate a successful login response
  return {
    token: 'mock-token',
    user: {
      id: '123',
      username,
    },
  };
};
