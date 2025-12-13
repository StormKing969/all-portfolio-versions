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
  id: WindowConfigType | "trash";
  name: string;
  icon: string;
  canOpen: boolean;
}

export type WindowConfigType =
  | "finder"
  | "contact"
  | "resume"
  | "safari"
  | "photos"
  | "terminal"
  | "txt_file"
  | "img_file";

export interface WindowConfigDataType {
  isOpen: boolean;
  zIndex: number;
  data: unknown | null;
}

export type WindowsState = Record<WindowConfigType, WindowConfigDataType>;

export interface WindowStore {
  windows: WindowsState;
  nextZIndex: number;
  openWindow: (windowKey: WindowConfigType, data?: unknown | null) => void;
  closeWindow: (windowKey: WindowConfigType) => void;
  focusWindow: (windowKey: WindowConfigType) => void;
}

export interface TechStackType {
  category: string;
  items: string[];
}

export interface BlogPostType {
  id: number;
  date: string;
  title: string;
  image: string;
  link: string;
}