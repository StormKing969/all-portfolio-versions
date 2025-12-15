import WindowWrapper from "../hoc/WindowWrapper.tsx";
import useWindowStore from "../store/window.tsx";
import { WindowControls } from "../components";
import type { FileDataType } from "../types";

const Image = () => {
  const { windows } = useWindowStore();
  const data = (windows.img_file?.data ?? null) as FileDataType | null;

  if (!data) {
    return null;
  }

  const { name, imageUrl } = data;

  return (
    <>
      <div id={"window-header"}>
        <WindowControls target={"img_file"} />
        <h2>{name}</h2>
      </div>

      <div className={"p-4 bg-white"}>
        {imageUrl ? (
          <div className={"w-full"}>
            <img
              src={imageUrl}
              alt={name}
              className={"w-full h-auto object-cover rounded"}
            />
          </div>
        ) : (
          <div className={"flex-center h-64 text-gray-400"}>
            <p>No image available</p>
          </div>
        )}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, "img_file");

export default ImageWindow;