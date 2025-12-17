import { locations } from "../constants/finderData.tsx";
import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";
import useWindowStore from "../store/window.tsx";
import type { FolderDataType } from "../types";
import useLocationStore from "../store/location.tsx";

// Ensure only folders are treated as projects so we can safely access windowPosition
const projects =
  (locations.work?.children.filter(
    (item) => item.kind === "folder",
  ) as FolderDataType[]) ?? [];

const Home = () => {
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

  const handleOpenProjectFinder = (project: FolderDataType) => {
    setActiveLocation(project);
    openWindow("finder");
  };

  useGSAP(() => {
    const draggableList = Draggable.create(".folder");

    return () => {
      draggableList.forEach((draggable) => {
        draggable.kill();
      });
    };
  }, []);

  return (
    <section id={"home"}>
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx("group folder", project.windowPosition)}
            onClick={() => handleOpenProjectFinder(project)}
          >
            <img src={"/images/folder.png"} alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;