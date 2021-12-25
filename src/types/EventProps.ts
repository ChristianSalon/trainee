interface EventProps {
  event: {
    attendance: [
      {
        date: {
          nanoseconds: number;
          seconds: number;
        };
        id: string;
        isComing: boolean;
        name: string;
        photoURL: string;
      }
    ];
    attendanceNumber: number;
    date: {
      nanoseconds: number;
      seconds: number;
    };
    details?: string;
    endTime: string;
    id: string;
    location: string;
    name: string;
    startTime: string;
    teams: string[];
    teamNames: string;
  };
}

export default EventProps;
