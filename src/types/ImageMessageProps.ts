interface ImageMessageProps {
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
    type: string;
    width: number;
    height: number;
  };
}

export default ImageMessageProps;
