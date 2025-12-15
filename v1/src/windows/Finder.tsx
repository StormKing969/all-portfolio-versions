import { Search } from "lucide-react";
import clsx from "clsx";

import WindowWrapper from "../hoc/WindowWrapper.tsx";
import { WindowControls } from "../components";
import { locations } from "../constants/finderData.tsx";
import useLocationStore from "../store/location.tsx";
import useWindowStore from "../store/window.tsx";
import type {
  LocationDataType,
  FolderDataType,
  FileDataType,
} from "../types";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  const renderList = (name: string, items: Array<LocationDataType | FolderDataType | FileDataType>) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              activeLocation && item.id === activeLocation.id
                ? "active"
                : "not-active",
            )}
          >
            <img src={item.icon} className={"w-4"} alt={item.name} />
            <p className={"text-sm font-medium truncate"}>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  // TODO: Remember to modify
  const openItem = (
    item: LocationDataType | FolderDataType | FileDataType | null,
  ) => {
    if (!item) {
      return;
    }

    if (item.kind === "folder") {
      return setActiveLocation(item);
    }

    if ("fileType" in item && item.fileType === "pdf") {
      return openWindow("resume");
    }

    if (["fig", "url"].includes(item.fileType) && item.href) {
      return window.open(item.href, "_blank");
    }

    if ("fileType" in item && item.fileType === "txt") {
      return openWindow("txt_file", item);
    }

    if ("fileType" in item && item.fileType === "img") {
      return openWindow("img_file", item);
    }
  };

  return (
    <>
      <div id={"window-header"}>
        <WindowControls target={"finder"} />

        <Search className={"icon"} />
      </div>

      <div className={"bg-white flex h-full"}>
        <div className={"sidebar"}>
          {renderList("Favorites", Object.values(locations))}
          {renderList("Work", locations.work.children)}
        </div>

        <ul className={"content"}>
          {activeLocation?.children.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;