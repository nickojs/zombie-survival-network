import { Gender } from '../contexts/authContext';

interface Location {
  latitude: number;
  longitude: number;
}

export interface CompactUser {
  id: string;
  username?: string;
  profile: UserProfile;
  location: Location;
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
  location: Location;
}
