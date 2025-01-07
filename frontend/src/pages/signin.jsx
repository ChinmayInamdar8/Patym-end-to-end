import { useState } from "react";
import { BottomWarning } from "../components/bottomwarning";
import { Button } from "../components/button";
import { Heading } from "../components/heading";
import { Inputbox } from "../components/inputbox";
import { SubHeading } from "../components/subheading";
import { useSetRecoilState } from "recoil";
import { token } from "../atom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

export const Signin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const setToken = useSetRecoilState(token);
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-md bg-white w-85 text-center p-2 h-max px-4">
          <Heading title={"Sign In"}></Heading>
          <SubHeading
            title={"Enter your credentials to access your account"}
          ></SubHeading>
          <Inputbox
            label={"Email"}
            placeholder={"Jondoe@gmial.com"}
            type={"text"}
            onchange={(e) => {
              setUserName(e.target.value);
            }}
          ></Inputbox>

          <Inputbox
            label={"Password"}
            placeholder={""}
            type={"Password"}
            onchange={(e) => {
              setPassword(e.target.value);
            }}
          ></Inputbox>

          <div className="pt-4">
            <Button
              label={"Sign In"}
              callback={async () => {
                console.log(userName);
                console.log(password);
                try {
                  const response = await axios.post(
                    "http://localhost:3000/api/v1/user/signin",
                    {
                      userName: userName,
                      password: password,
                    });

                  setToken(response.data.token);
                  navigate('/dashboard');

                } catch (e) {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Use is not present try again",
                  });
                }
              }}
            ></Button>
          </div>

          <BottomWarning
            label={"Don't have an account?"}
            where={" Sign Up"}
            to={"/signup"}
          ></BottomWarning>
        </div>
      </div>
    </div>
  );
};
