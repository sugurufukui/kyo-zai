import React, { FC, memo, useContext, useEffect, useState } from "react";

import { AuthContext } from "providers/AuthProvider";
import { useAllMaterials } from "hooks/useAllMaterials";

import { Button, Grid, Paper, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/system";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import Cookies from "js-cookie";
import { getGuestUserSignIn } from "lib/api/auth";
import { useSnackbar } from "providers/SnackbarProvider";
import HomeImage from "images/HOME.jpg";
import { ForHomeMaterialCard } from "components/organisms/material/ForHomeMaterialCard";

// とりあえず認証済みユーザーの名前やメールアドレスを表示
export const Home: FC = memo(() => {
  const history = useHistory();

  const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } =
    useContext(AuthContext);
  const { getMaterials, materials } = useAllMaterials();
  const { showSnackbar } = useSnackbar();

  const [recentMaterials, setRecentMaterials] = useState([]);

  // 教材データの取得
  useEffect(() => {
    getMaterials();
  }, [getMaterials]);

  useEffect(() => {
    setRecentMaterials(materials.slice(0, 4));
  }, [materials]);

  console.log(materials.slice(0, 4));

  // ゲストログインボタン押下時
  const onClickGuestSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await getGuestUserSignIn();
      console.log(res);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        showSnackbar("ゲストユーザーとしてログインしました", "success");
        history.push("/materials");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", margin: "20px auto" }}>
        <Grid wrap="wrap" container display="flex" alignItems="center">
          <Grid item xs={12}>
            <Paper
              component="img"
              src={`${HomeImage}`}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Paper>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ textAlign: "center", justifyContent: "center", my: 5 }}>
        <Typography variant="h4">
          こどもたちのためにがんばっているあなたへ
        </Typography>
        <Typography variant="h6" sx={{ m: 2 }}>
          ほかの先生たちが使っている教材を見ることができます
        </Typography>
      </Box>

      {!isSignedIn && (
        <Box sx={{ textAlign: "center", justifyContent: "center" }}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={onClickGuestSignIn}
          >
            ゲストログイン
          </Button>
        </Box>
      )}
      {!isSignedIn && (
        <Box sx={{ textAlign: "center", justifyContent: "center", my: 3 }}>
          <Typography variant="h5">みんなの教材を見てみる</Typography>
        </Box>
      )}

      {isSignedIn && (
        <Box sx={{ textAlign: "center", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={() => history.push("/materials")}
          >
            みんなの教材を見てみる
          </Button>
        </Box>
      )}
      {isSignedIn && (
        <Box sx={{ textAlign: "center", justifyContent: "center", my: 3 }}>
          <Typography variant="h5">作ってみたいものに いいね♡しよう</Typography>
        </Box>
      )}

      <Box sx={{ display: "flex", alignItems: "center", my: 4, pl: 3 }}>
        <MenuBookTwoToneIcon color="action" sx={{ fontSize: 30 }} />
        <Typography variant="h5" sx={{ ml: 2 }}>
          最新の教材
        </Typography>
      </Box>

      <Grid
        container
        display="flex"
        alignItems="center"
        sx={{
          flexWrap: "wrap",
        }}
      >
        {recentMaterials.map((material) => (
          <Grid key={material.id} sx={{ m: "auto", p: "4" }}>
            <ForHomeMaterialCard
              id={material.id}
              imageUrl={material.image.url}
              materialName={material.name}
              materialId={material.id}
              currentUser={currentUser}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
});
