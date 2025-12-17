import gsap from "gsap";
import { Draggable } from "gsap/all";
import { useGSAP } from "@gsap/react";

import { Dock, Home, Navbar, Welcome } from "./components";
import {
  Finder,
  Resume,
  Safari,
  Terminal,
  Text,
  Image,
  Contact,
} from "./windows";

gsap.registerPlugin(Draggable, useGSAP);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Home />
    </main>
  );
};

export default App;