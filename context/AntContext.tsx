"use client";

import React, { useState } from "react";
import { createContext } from "react";

interface AntContextType {
  user: string;
  validCode: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  setValidCode: React.Dispatch<React.SetStateAction<string>>;
}

const initial = {
  user: "",
  validCode: "",
  setValidCode: () => {},
  setUser: () => {},
};

export const AntContext = createContext<AntContextType>(initial);

export const AntContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<string>("");
  const [validCode, setValidCode] = useState<string>("");

  return (
    <AntContext.Provider value={{ user, validCode, setUser, setValidCode }}>
      {children}
    </AntContext.Provider>
  );
};
