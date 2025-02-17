export interface USERInfo {
  email: '';
  id: 2;
  nickname: '';
  phone: '15002292298';
  username: 'bhabgs';
}
export interface USER {
  access_token: string;
  info: USERInfo;
}
export interface USERCreate {
  username: string;
  password: string;
  email?: string;
  phone?: string;
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
export interface USERLogin {
  username: string;
  password: string;
}
