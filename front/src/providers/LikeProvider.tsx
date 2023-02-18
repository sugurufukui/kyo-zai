import { useLike } from "hooks/useLike";
import { createContext, FC, ReactNode } from "react";

type LikeContextType = {
  initialLikeCount: number;
};

type Props = {
  children: ReactNode;
  initialLikeCount: number;
};
export const LikeContext = createContext<LikeContextType>(
  {} as LikeContextType
);

export const LikeProvider: FC<Props> = (props) => {
  const { children } = props;

  // const { initialLikeCount } = useLike(props);

  return (
    <></>
    // <LikeContext.Provider value={{ initialLikeCount }}>
    //   {children}
    // </LikeContext.Provider>
  );
};
