import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { FC, memo } from "react";
import { PrimaryButton } from "../atoms/PrimaryButton";

export const Login: FC = memo(() => {
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" p="4" borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          特別支援教育教材検索アプリ
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input placeholder="ユーザーID" />
          <PrimaryButton children="ログイン" />
        </Stack>
      </Box>
    </Flex>
  );
});
