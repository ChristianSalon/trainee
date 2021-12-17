interface TextMessageProps {
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
  };
}

export default TextMessageProps;
