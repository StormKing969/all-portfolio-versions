export interface NavLinkType {
  id: number;
  name: string;
  type: WindowConfigType;
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

export interface WindowStoreState {
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

export interface FileDataType {
  id: number;
  name: string;
  icon: string;
  kind: "file";
  fileType: "txt" | "url" | "img" | "fig" | "pdf";
  position?: string;
  subtitle?: string;
  description?: string[];
  href?: string;
  imageUrl?: string;
}

export interface FolderDataType {
  id: number;
  name: string;
  icon: string;
  kind: "folder";
  position: string;
  windowPosition?: string;
  children: Array<FileDataType | FolderDataType>;
}

export interface LocationDataType {
  id: number;
  type: string;
  name: string;
  icon: string;
  kind: "folder";
  children: Array<FolderDataType | FileDataType>;
}

export interface LocationStoreState {
  activeLocation: LocationDataType | FolderDataType | FileDataType;
  setActiveLocation: (
    location: LocationDataType | FolderDataType | FileDataType,
  ) => void;
  resetActiveLocation: () => void;
}

export interface SocialType {
  id: number;
  text: string;
  icon: string;
  bg: string;
  link: string;
}