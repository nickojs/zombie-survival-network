import { Gender } from '../contexts/authContext';

export interface CompactUser {
  id: string;
  username?: string;
  profile: UserProfile;
}

export interface UserProfile {
  id: string;
  fullName: string;
  age: number;
  gender: Gender
}

export interface User {
  userId: string;
  iat: number;
  email: string;
  username: string;
  profile: UserProfile | null;
}
