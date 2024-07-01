
export interface ChatProps {
  value: string;
  date: string;
  usernmae: string;
}

export default function Chat() {
    return (
      <>
        <div className="grid grid-rows-1 w-3/4">
          <div className="container rounded-md">
            <h3>
              User: <span>Message</span>
            </h3>
          </div>
        </div>
      </>
    );
}