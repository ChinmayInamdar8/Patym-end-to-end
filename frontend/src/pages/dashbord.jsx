import { useRecoilState, useRecoilValue } from "recoil";
import { AppBar } from "../components/appbar";
import { Balance } from "../components/balance";
import { Users } from "../components/users";
import axios from "axios";
import { token } from "../atom";
import { useEffect, useState } from "react";

export const Dashboard = () => {

  const Authtoken = useRecoilValue(token);
  const [balance, setBalance] = useState(null);

  useEffect(()=>{
      const returnBalance = async()=>{
        const fetchedBalance = await fetchBalance(Authtoken);
        setBalance(fetchedBalance);
      };
      returnBalance();
  }, [token]);

  return (
    <div className="bg-slate-300 h-screen w-screen flex justify-center">
      <div className="flex flex-col w-screen items-center justify-center">
        <div className="rounded-md bg-white w-4/5 min-h-96 text-center p-2 h-max px-4">
        <AppBar></AppBar>

<Balance value={balance}></Balance>

<Users></Users>
        </div>
      </div>
    </div>
  );
};

const fetchBalance = async(token)=>{
  const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
    headers:{
      authorization:`Bearer ${token}`
    }
  });

  return response.data.balance;
}
