import { useLayoutEffect, useRef, type ComponentType } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

import useWindowStore from "../store/window.tsx";
import type { WindowConfigType } from "../types";

type WindowWrapperProps<P> = P;

const WindowWrapper = <P extends object>(
  Component: ComponentType<P>,
  windowKey: WindowConfigType,
) => {
  const Wrapped = (props: WindowWrapperProps<P>) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef<HTMLElement | null>(null);

    useGSAP(() => {
      const ele = ref.current;
      if (!ele || !isOpen) {
        return;
      }

      ele.style.display = "block";
      gsap.fromTo(
        ele,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      );
    }, [isOpen]);

    useGSAP(() => {
      const ele = ref.current;
      if (!ele) {
        return;
      }

      const [instance] = Draggable.create(ele, {
        onPress: () => focusWindow(windowKey),
      });

      return () => instance.kill();
    }, []);

    useLayoutEffect(() => {
      const ele = ref.current;
      if (!ele) {
        return;
      }

      ele.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className={"absolute"}
      >
        <Component {...(props as P)} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;