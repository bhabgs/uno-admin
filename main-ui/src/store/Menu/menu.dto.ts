export interface Menu {
  name: string;
  id: string;
  path: string;
  component?: JSX.Element;
  type?: 'iframe' | 'component';
  children?: Menu[];
}
