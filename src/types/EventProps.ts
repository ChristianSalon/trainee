interface EventProps {
  event: {
    eventId: string;
    name: string;
    details: string | null;
    attendanceNumber: number;
    location: string;
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
  };
}

export default EventProps;
