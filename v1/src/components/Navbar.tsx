import dayjs from "dayjs";

import type { NavIconType, NavLinkType } from "../types";
import { navIcons, navLinks } from "../constants/navbarData.tsx";
import useWindowStore from "../store/window.tsx";

const Navbar = () => {
  const { openWindow } = useWindowStore();

  return (
    <nav>
      <div>
        <img src={"/images/logo.svg"} alt="logo" />
        <p className={"font-bold"}>Sajana's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }: NavLinkType) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }: NavIconType) => (
            <li key={id}>
              <img src={img} alt={`link icon-${id}`} className={"icon"} />
            </li>
          ))}
        </ul>

        <time>{dayjs().format("ddd MMM D YYYY h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;