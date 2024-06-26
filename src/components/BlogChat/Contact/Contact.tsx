
export interface ContactProps {
  id: number;
  name: string;
  creator: string;
}

export default function Contact(props: ContactProps) {
    return (
      <>
        <div className="py-2 box-border hover:bg-slate-100 group rounded-xl">
          <div className="text-3xl px-3">
            <h1>{props.name}</h1>
          </div>
          <div className="text-xl px-3">
            <span>Creator:{props.creator}</span>
          </div>
          <div className="text-xl mt-3">
            <button className="px-3 border rounded-2xl ml-10 border-gray-50 group-hover:border-gray-900">Share Room</button>
          </div>
        </div>
      </>
    );
}