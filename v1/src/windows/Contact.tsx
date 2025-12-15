import WindowWrapper from "../hoc/WindowWrapper.tsx";
import {WindowControls} from "../components";

const Contact = () => {
    return (
        <>
            <div id={"window-header"}>
                <WindowControls target={"contact"} />
                <h2>Contact Me</h2>
            </div>
        </>
    )
}

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;