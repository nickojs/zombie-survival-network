import { Gender } from '../contexts/authContext';

interface Item {
  id: number;
  OSRSId: string;
  qtd: number;
}

interface Containers {
  id: number;
  position: string;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface Flag {
  id: number;
  user: User;
  flaggedBy: string;
  createdAt: Date;
}

export interface UserProfile {
  id: string;
  fullName: string;
  age: number;
  gender: Gender
}

export interface User {
  id: string;
  username: string;
  email: string;
  profile?: UserProfile;
  location?: Location;
  flags?: Flag[];
  containers?: Containers;
  items?: Item[];
}
