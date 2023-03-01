export type MaterialType = {
  id: number;
  name: string;
  description: string;
  image: {
    url: string;
  };
  user: {
    id: number;
    name: string;
  };
  userId: number;
};
