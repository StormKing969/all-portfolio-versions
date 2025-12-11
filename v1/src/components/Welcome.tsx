import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type FontWeightType = "subtitle" | "title";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text: string, className: string, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `"wght" ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (
  container: HTMLDivElement | null,
  type: FontWeightType,
) => {
  if (!container) {
    return;
  }

  const letters: NodeListOf<HTMLSpanElement> =
    container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetters = (
    letter: HTMLSpanElement,
    weight: number,
    duration = 0.25,
  ) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `"wght" ${weight}`,
    });
  };

  const handleMouseMove = (event: MouseEvent) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = event.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 2000);

      animateLetters(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetters(letter, base, 0.3);
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseout", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      if (titleCleanup) {
        titleCleanup();
      }
      if (subtitleCleanup) {
        subtitleCleanup();
      }
    };
  }, []);

  return (
    <section id={"welcome"}>
      <p ref={subtitleRef}>
        {renderText(
          "Hey, I'm Sajana! Welcome to my",
          "text-3xl font-georama",
          100,
        )}
      </p>
      <h1 ref={titleRef}>
        {renderText("portfolio", "text-9xl italic font-georama")}
      </h1>

      <div className={"small-screen"}>
        <p>This Portfolio is designed for desktop & tablet screens so far.</p>
      </div>
    </section>
  );
};

export default Welcome;