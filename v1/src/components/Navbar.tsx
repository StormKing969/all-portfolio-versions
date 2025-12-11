import dayjs from "dayjs";

import { navIcons, navLinks } from "../constants";
import type { NavIconType, NavLinkType } from "../types";

const Navbar = () => {
  return (
    <nav>
      <div>
        <img src={"/images/logo.svg"} alt="logo" />
        <p className={"font-bold"}>Sajana's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name }: NavLinkType) => (
            <li key={id}>
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