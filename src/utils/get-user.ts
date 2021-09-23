import { verify } from 'jsonwebtoken';

export interface VerifiedUser {
  id: string;
  iat: number;
}

export const getUser = (token: string | null): VerifiedUser | null => {
  if (token) {
    try {
      const user = verify(token, process.env.JWT_SECRET || '') as VerifiedUser;
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (err) {
      throw new Error('Session invalid');
    }
  }
  return null;
};
