import { MENU } from './menu';

export interface USER {
  token: string;
  role: 'admin' | 'user';
  id?: string;
  info: Record<string, string>;
  roleKeys: string[];
  menu?: MENU[];
}
export interface USERCreate {
  username: string;
  password: string;
}
export interface USERUpdate {
  username: string;
  password: string;
}
export interface USERDelete {
  id: number;
}
export interface USERGet {
  id: number;
}
