import { useState } from "react";
import { BottomWarning } from "../components/bottomwarning";
import { Button } from "../components/button";
import { Heading } from "../components/heading";
import { Inputbox } from "../components/inputbox";
import { SubHeading } from "../components/subheading";
import axios from 'axios';
import { useSetRecoilState } from "recoil";
import { token } from "../atom";
import {useNavigate} from "react-router-dom";
import Swal from 'sweetalert2'

export const Signup = () => {
  const [firstName , setFirstName] = useState('');
  const [lastName , setLastName] = useState('');
  const [userName , setUserName] = useState('');
  const [password , setPassword] = useState('');

  const setToken = useSetRecoilState(token);
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-md bg-white w-85 text-center p-2 h-max px-4">
          <Heading title={"Sign UP"}></Heading>

          <SubHeading
            title={"Enter your information to create an account"}
          ></SubHeading>

          <Inputbox
            label={"First Name"}
            placeholder={"Jon"}
            type={"text"}
            onchange={(e)=>{
             setFirstName(e.target.value);
            }}
          ></Inputbox>
          <Inputbox
            label={"Last Name"}
            placeholder={"Doe"}
            type={"text"}
            onchange={(e)=>{
              setLastName(e.target.value);
             }}
          ></Inputbox>
          <Inputbox
            label={"Email"}
            placeholder={"JonDoe@gmail.com"}
            type={"text"}
            onchange={(e)=>{
              setUserName(e.target.value);
             }}
          ></Inputbox>
          <Inputbox
            label={"password"}
            placeholder={""}
            type={"password"}
            onchange={(e)=>{
              setPassword(e.target.value);
             }}
          ></Inputbox>

          <div className="pt-4">
          <Button label={"Sign Up"} callback ={async()=>{
            console.log("hi there");
            try{
              const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                userName:userName,
                password:password,
                firstName:firstName,
                lastName:lastName,
              })

                setToken(response.data.token);
                window.localStorage.setItem("token",response.data.token);
                  window.localStorage.setItem("userName",response.data.userName);
                navigate('/dashboard');

            }
            catch(e){
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "wrong Credentials try again",
              });
            }

          }}></Button>
          </div>

          <BottomWarning
            label={"Already have an account?"}
            where={"Sign In"}
            to={"/signin"}
          ></BottomWarning>
        </div>
      </div>
    </div>
  );
};
