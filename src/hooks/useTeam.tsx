import React, { createContext, useContext, useState } from "react";
import { Team } from "../types";

interface Props {
  team: Team;
  setTeam: React.Dispatch<React.SetStateAction<Team>>;
}

const TeamContext = createContext<Props>({} as any);

export const TeamProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [team, setTeam] = useState<Team>({
    teamId: "null",
    name: "null",
    photoURL: "null",
    clubId: "null",
  });

  return (
    <TeamContext.Provider value={{ team, setTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

export default function useTeam() {
  return useContext(TeamContext);
}
