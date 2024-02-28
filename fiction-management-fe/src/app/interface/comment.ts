import { User } from './user';

export interface Comment {
  id: number;
  content: string;
  fictionId: number;
  userId: number;
  user: User;
}
