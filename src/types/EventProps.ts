import { EventProps } from ".";

interface EventProps {
  event: {
    attendance: [
      {
        date: {
          nanoseconds: number;
          seconds: number;
        };
        isComing: boolean;
        name: string;
        photoURL: string;
      }
    ];
    date: {
      nanoseconds: number;
      seconds: number;
    };
    endTime: string;
    id: string;
    location: string;
    name: string;
    startTime: string;
    teams: string[];
  };
}

export default EventProps;
