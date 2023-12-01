import { AppUser } from './appUser';

export interface Profile {
  id?: number;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  email: string;
  photo?: string;
  resume?: string;
  skills: string;
  experience: string;
  appUserId: number;
}
