import { AppBar } from "../components/appbar";
import { Balance } from "../components/balance";
import { Users } from "../components/users";

export const Dashboard = () => {
  return (
    <div className="bg-slate-300 h-screen w-screen flex justify-center">
      <div className="flex flex-col w-screen items-center justify-center">
        <div className="rounded-md bg-white w-4/5 min-h-96 text-center p-2 h-max px-4">
        <AppBar></AppBar>

<Balance value={10000}></Balance>

<Users></Users>
        </div>
      </div>
    </div>
  );
};
