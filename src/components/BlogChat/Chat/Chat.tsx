import { memo } from "react";

export interface ChatProps {
  value: string;
  // date: string;
  username: string;
}

function Chat(props: ChatProps) {
  return (
    <>
      <div className="grid grid-rows-1 w-3/4">
        <div className="container rounded-md">
          <h3>
            {props.username}: <span>{props.value}</span>
          </h3>
        </div>
      </div>
    </>
  );
}

export default memo(Chat);