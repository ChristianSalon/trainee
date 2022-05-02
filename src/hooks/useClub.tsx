import React, { createContext, useContext, useState } from "react";
import { Roles, Club } from "../types";

interface Props {
  club: Club;
  setClub: React.Dispatch<React.SetStateAction<Club>>;
}

const ClubContext = createContext<Props>({} as any);

export const ClubProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [club, setClub] = useState<Club>({
    clubId: "null",
    name: "null",
    photoURL: "null",
    accountId: null,
    isAccountSetUp: 0,
  });

  return (
    <ClubContext.Provider value={{ club, setClub }}>
      {children}
    </ClubContext.Provider>
  );
};

export default function useClub() {
  return useContext(ClubContext);
}
