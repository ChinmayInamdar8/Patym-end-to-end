import { useEffect, useState } from "react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState, useRecoilValue} from "recoil";
import { allUsers, sendTo } from "../atom";

export const Users = () => {
  const setAllUsers = useSetRecoilState(allUsers);
  const users = useRecoilValue(allUsers);
  const [search, setSearch] = useState('');

  useEffect(()=>{
    const result = async ()=>{
        const response = await axios.get(`http://localhost:3000/api/v1/user/bluk?filter=${search}`);
        const data = response.data;
        console.log(data);
        setAllUsers(data.user);
    }
    result();
  }, [search]);


  return (
    <div>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div>
        <input
          type="text"
          name="usersearch"
          id="usersearch"
          placeholder="Search users"
          className="border border-slate-500 rounded-md focus:outline-none py-0.5 w-full px-2 mt-4"
          onChange={(event)=>{
                let searchStr = event.target.value;
                if(searchStr!=""){
                    searchStr = searchStr.charAt(0).toUpperCase() + searchStr.slice(1);
                }
                console.log(searchStr);
                setSearch(searchStr);

          }}
        />
      </div>
      <div className="mt-3">
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  const setSendTo = useSetRecoilState(sendTo);
  if(window.localStorage.getItem("userName")!==user.userName){
    return (
      <div className="flex justify-between" key={user._id}>
        <div className="flex">
          <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 ">
            <div className="flex flex-col justify-center h-full text-xl">
              {user.firstName[0]}
            </div>
          </div>
          <div className="flex flex-col justify-center h-full">
            {user.firstName} {user.lastName}
          </div>
        </div>
  
        <div className="flex flex-col justify-center h-full">
          <Button
            label={"Send Money"}
            callback={() => {
              navigate("/send");
              setSendTo({
                  name:`${user.firstName} ${user.lastName}`,
                  id:user._id,
              });
            }}
          ></Button>
        </div>
      </div>
    );
  }
}
