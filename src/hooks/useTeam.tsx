import React, { createContext, useContext, useState } from "react";
import { Roles, Team } from "../types";

interface Props {
  team: Team;
  setTeam: React.Dispatch<React.SetStateAction<Team>>;
  roles: Roles;
  setRoles: React.Dispatch<React.SetStateAction<Roles>>;
}

const TeamContext = createContext<Props>({} as any);

export const TeamProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [team, setTeam] = useState<Team>({
    teamId: "null",
    name: "null",
    photoURL: "null",
    clubId: "null",
  });
  const [roles, setRoles] = useState({
    isMember: true,
    isCoach: false,
    isManager: false,
  });

  return (
    <TeamContext.Provider value={{ team, setTeam, roles, setRoles }}>
      {children}
    </TeamContext.Provider>
  );
};

export default function useTeam() {
  return useContext(TeamContext);
}
