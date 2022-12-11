import { Button } from "@chakra-ui/react";
import { FC, memo, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const PrimaryButton: FC<Props> = memo((props) => {
  const { children } = props;
  return (
    <Button colorScheme="teal" color="white" _hover={{ opacity: 0.8 }}>
      {children}
    </Button>
  );
});
