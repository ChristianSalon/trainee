interface AttendanceProps {
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
}

export default AttendanceProps;
