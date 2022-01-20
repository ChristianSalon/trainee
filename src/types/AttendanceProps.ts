interface AttendanceProps {
  attendance: [
    {
      id: number;
      userId: string;
      eventId: string;
      isComing: boolean;
      date: string;
      name: string;
      photoURL: string;
    }
  ];
}

export default AttendanceProps;
