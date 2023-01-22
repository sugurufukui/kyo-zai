import { FC, memo, useState } from "react";
import { MaterialFormBody } from "components/pages/MaterialFormBody";
import { createMaterial } from "lib/api/material";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "providers/SnackbarProvider";

export const MaterialNew: FC = memo(() => {
  const [value, setValue] = useState([]);
  const history = useHistory();
  const { showSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const onClickSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = createMaterial(value);
      console.log(res);
      // 登録できたら一覧画面へ推移
      history.push("/materials");
      showSnackbar("教材を登録しました", "success");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MaterialFormBody
        handleChange={handleChange}
        onClickSubmit={onClickSubmit}
        value={value}
        buttonType="登録"
      />
      <button onClick={() => history.goBack()}>戻る</button>
    </>
  );
});
