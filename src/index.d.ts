import React from "react";

export type StenoChatProps = {
  id?: string;
  origin: string;
  url?: string;
  position?: "left" | "right";
};

export const StenoChat: React.FC<StenoChatProps>;
