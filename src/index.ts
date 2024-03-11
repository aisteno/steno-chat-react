import { useEffect } from "react";

type StenoChatProps = {
  id?: string;
  origin: string;
  url?: string;
  position?: "left" | "right";
};

const StenoChat = ({
  id = "default",
  origin,
  url = "https://chat.steno.ai",
  position = "right",
}: StenoChatProps) => {
  useEffect(() => {
    // check if the script is already loaded
    if (
      document.getElementById("steno-chat") ||
      document.getElementById("chat-iframe")
    ) {
      return;
    }
    const script = document.createElement("script");
    script.id = "steno-chat";
    script.type = "text/javascript";
    script.src =
      "https://cdn.jsdelivr.net/gh/aisteno/embed@1.1.4/steno-chat.js";

    if (id) {
      script.setAttribute("data-id", id);
    }
    if (origin) {
      script.setAttribute("data-origin", origin);
    }
    if (url) {
      script.setAttribute("data-url", url);
    }
    if (position) {
      script.setAttribute("data-position", position);
    }

    const handleScriptError = (event: Event) => {
      console.error("Steno Chat - Script failed to load:", event);
    };

    const handleScriptLoad = () => {
      console.log("Steno Chat - Script loaded successfully");
      document.dispatchEvent(new Event("steno-chat-loaded"));
    };

    script.addEventListener("error", handleScriptError);
    script.addEventListener("load", handleScriptLoad);
    document.body.appendChild(script);

    return () => {
      const iframe = document.getElementById("chat-iframe");
      if (iframe) {
        iframe.remove();
      }
      script.removeEventListener("load", handleScriptLoad);
      script.removeEventListener("error", handleScriptError);
      document.body.removeChild(script);
    };
  }, [id, origin, url, position]);

  return null;
};

export default StenoChat;
