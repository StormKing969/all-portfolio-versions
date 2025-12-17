import WindowWrapper from "../hoc/WindowWrapper.tsx";
import { WindowControls } from "../components";
import { socials } from "../constants/contactData.tsx";

const Contact = () => {
  return (
    <>
      <div id={"window-header"}>
        <WindowControls target={"contact"} />
        <h2>Contact Me</h2>
      </div>

      {/*TODO: Change the image*/}
      <div className={"p-5 space-y-5"}>
        <img
          src={"/images/adrian.jpg"}
          alt="Profile Pic"
          className={"w-20 rounded-full"}
        />

        <h3>Let's Connect</h3>
        <p>Got an idea? An issue to fix? Or just have a chat? Reach out!</p>
        <p>wijesinghesaj@gmail.com</p>

        <ul>
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}
                aria-label={`Visit ${text}`}
              >
                <img src={icon} alt={text} className={"size-5"} />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;