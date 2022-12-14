import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, memo, useContext } from "react";
import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { signOut } from "../../../lib/api/auth/signOut";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

// const useStyles = makeStyles((theme: Theme) => ({
//   iconButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     textDecoration: "none",
//     color: "inherit",
//   },
//   linkBtn: {
//     textTransform: "none",
//   },
// }));

export const Header: FC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const {} = useContext()

  // const handleSignOut = () => {
  //   try {
  //     const res = await signOut()

  //     if(res.data.success === true) {
  //       //サインアウト時にはCookieを削除
  //       Cookies.remove("_access_token")
  //       Cookies.remove("_client")
  //       Cookies.remove("_uid")

  //       // setIssignedIn(false)

  //     }
  //   }
  // }

  const AuthButton = () => {
    //認証完了時はサインアウト用のボタンを表示
    //未認証時は認証用のボタンを表示
    // if (!loading) {
    //   if (isSignedIn) {
    //     return (
    //       <Button
    //         color="inherit"
    //         // className={classes.linkBtn}
    //         onClick={handleSignOut}
    //       >
    //         ログアウト
    //       </Button>
    //     );
    //   } else {
    //     return (
    //       <>
    //         <Button
    //           component={Link}
    //           to="/signin"
    //           color="inherit"
    //           // className={classes.linkBtn}
    //         >
    //           ログイン
    //         </Button>
    //         <Button
    //           component={Link}
    //           to="/signup"
    //           color="inherit"
    //           // className={classes.linkBtn}
    //         >
    //           新規登録
    //         </Button>
    //       </>
    //     );
    //   }
    // } else {
    //   return <></>;
    // }
  };

  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex align="center" as="a" _hover={{ cursor: "pointer" }}>
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            きょーざい
          </Heading>
        </Flex>

        <Flex
          align="center"
          fontSize="sm"
          display={{ base: "none", md: "flex" }}
        >
          <Box pr={4}>
            <Link>教材一覧</Link>
          </Box>
          <Link>ユーザープロフィール</Link>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
});
