import { User } from "./user"; // 追加

export type MaterialType = {
  id: number;
  name: string;
  description: string;
  image: {
    url: string;
  };
  user: User;
  userId: number;
};
