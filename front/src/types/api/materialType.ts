import { Like } from "types/api/like";

export type MaterialType = {
  id: number;
  name: string;
  description: string;
  image?: string;
  user: {
    id: number;
    name: string;
  };
  likes: Like[];
};
