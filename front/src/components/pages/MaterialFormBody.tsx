import { FC, memo } from "react";

type Props = {
  onClickSubmit: any;
  handleChange: any;
  value: any;
  buttonType: string;
};

export const MaterialFormBody: FC<Props> = memo((props) => {
  const { onClickSubmit, handleChange, value, buttonType } = props;
  return (
    <>
      <form>
        <div>
          <label htmlFor="name">名前</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => handleChange(e)}
            value={value.name}
          />
        </div>
        <div>
          <label htmlFor="description">説明文</label>
          <input
            type="description"
            name="description"
            id="description"
            onChange={(e) => handleChange(e)}
            value={value.description}
          />
          <input
            type="submit"
            value={buttonType}
            onClick={(e) => onClickSubmit(e)}
          />
        </div>
      </form>
    </>
  );
});
