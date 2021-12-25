interface VideoMessageProps {
  message: {
    content: string;
    createdAt: {
      nanoseconds: number;
      seconds: number;
    };
    creatorId: string;
    id: string;
    name: string;
    photoURL: string;
    thumbnailURL: string;
    type: string;
  };
}

export default VideoMessageProps;
