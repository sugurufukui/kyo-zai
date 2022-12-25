import React, { FC, memo, useContext } from "react";

import { AuthContext } from "providers/AuthProvider";

// とりあえず認証済みユーザーの名前やメールアドレスを表示
export const Home: FC = memo(() => {
  const { isSignedIn, currentUser } = useContext(AuthContext);

  return (
    <>
      {isSignedIn && currentUser ? (
        <>
          <h2>メールアドレス: {currentUser?.email}</h2>
          <h2>名前: {currentUser?.name}</h2>
        </>
      ) : (
        <></>
      )}
    </>
  );
});
