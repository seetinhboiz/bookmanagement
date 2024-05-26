import { Chapter } from './chapter';
import { Comment } from './comment';
import { Process } from './process';
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
  process?: Process;
  chapters?: Chapter[];
  comments?: Comment[];
  coverPublicId?: string;
}
