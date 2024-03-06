import { Chapter } from './chapter';
import { Comment } from './comment';
import { Tag } from './tag';
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
  tags?: Tag[]; 
  chapters?: Chapter[];
  comments?: Comment[];
}
