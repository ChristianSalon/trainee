import React, { createContext, useContext, useState } from "react";
import { TeamProps } from "../types";

const TeamContext = createContext({});

export const TeamProvider = ({ children }: any) => {
  const [team, setTeam] = useState<TeamProps | null>(null);
  return (
    <TeamContext.Provider value={{ team, setTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

export default function useTeam() {
  return useContext(TeamContext);
}
