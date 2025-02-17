export interface MENU {
  name: string;
  path: string;
  groupName?: string;
  id?: string;
  icon?: string;
  children?: MENU[];
}
