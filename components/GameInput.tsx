import { FC } from "react";

interface Props {
  paragraph: string;
}

const GameInput: FC<Props> = ({ paragraph }) => {
  return (
    <div className="game-input">
      <input type="text" placeholder={paragraph} />
    </div>
  );
};
export default GameInput;
