import Card from "@/components/Card/Card";
import SideBar from "@/components/SideBar/SideBar";

export default function Home() {
  return (
    <div className="grid grid-cols-12 gap-1">
      <div className="col-span-2 text-xl bg-gray-500">
        <SideBar />
      </div>
      <div className="col-span-10 bg-slate-200">
        <div className="grid grid-cols-3">
          <Card />
        </div>
      </div>
    </div>
  );
}
