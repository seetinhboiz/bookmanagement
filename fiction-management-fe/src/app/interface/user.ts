export interface User {
  id?: number | null;
  username: string;
  password?: string | null;
  avatarUrl: string;
  role: string;
  avatarPublicId?: string;
}
