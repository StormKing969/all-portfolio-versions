export interface NavLinkType {
  id: number;
  name: string;
  type: string;
}

export interface NavIconType {
  id: number;
  img: string;
}

export interface DockAppType {
  id: string;
  name: string;
  icon: string;
  canOpen: boolean;
}