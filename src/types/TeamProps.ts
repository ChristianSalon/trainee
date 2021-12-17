interface TeamProps {
  team: {
    coaches: string[];
    id: string;
    lastMessage: string;
    members: string[];
    name: string;
    clubName: string;
    photoURL: string;
    updatedAt: {
      nanoseconds: number;
      seconds: number;
    };
  };
}

export default TeamProps;
