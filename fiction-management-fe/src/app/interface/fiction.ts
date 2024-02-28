import { Chapter } from './chapter';
import { User } from './user';

export interface Fiction {
  id?: number;
  name: string;
  countView: number;
  coverUrl: string;
  status: boolean;
  description: string;
  userId: number;
  user?: User;
  chapters?: Chapter[];
  comments?: Comment[];
}
