export const TOPIC_STATUS = {
  TEMP: "temp",
  PUBLISH: "publish"
}

export interface Topic {
  id: number;
  created_at: Date | string;
  author: any;
  title: string;
  content: string;
  category: string;
  thumbnail: string;
  status: typeof TOPIC_STATUS;
  users: {email: string}
}