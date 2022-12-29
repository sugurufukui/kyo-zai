// import axios from "axios";
// import { useCallback, useState } from "react";
// import { LoginParams } from "../types/api/LoginParams";
// import { useHistory } from "react-router-dom";

import { getCurrentUser } from "lib/api/auth";
import { useEffect, useState } from "react";
import { User } from "types/api/user";

// 認証済みのユーザーがいるかどうかチェックするカスタムフック
//useStateの内容を外部で使用できるようにフック化
// 確認できた場合はそのユーザーの情報を取得
// (consoleはログインする前に走る)
export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  //ここはaxiosで書きたい
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      console.log(res);

      if (res?.status === 200) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        console.log(res?.data);
      } else {
        // alert("ユーザーがいません");
        console.log("ユーザーがいません");
        console.log(res?.data);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  //サインイン時にhandleGetCurrentUserしてユーザーの情報をもたせた方がいい？
  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  return {
    handleGetCurrentUser,
    loading,
    setLoading,
    isSignedIn,
    setIsSignedIn,
    currentUser,
    setCurrentUser,
  };
};
// export const useAuth = () => {
//   const history = useHistory();

//   //ローディング中に表示するもの
//   const [loading, setLoading] = useState(false);

//   const login = useCallback(() => {
//     setLoading(true);
//     axios
//       .get<SignInparams>(`https://jsonplaceholder.typicode.com/users/${email}`)(`http://localhost:3000/api/v1/user/${email}`)
//       .then((res) => {
//         if (res.data) {
//           history.push("/home");
//         } else {
//           alert("ユーザーが見つかりません");
//         }
//       })
//       .catch((err) => alert("ログインできません"))
//       .finally(() => setLoading(false));
//   }, [history]);
//   return { login };
// };
