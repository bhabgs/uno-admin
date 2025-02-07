export interface USER {
  token: string;
  id: number;
  info: Record<string, string>;
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
