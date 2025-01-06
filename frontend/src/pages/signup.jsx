import { BottomWarning } from "../components/bottomwarning";
import { Button } from "../components/button";
import { Heading } from "../components/heading";
import { Inputbox } from "../components/inputbox";
import { SubHeading } from "../components/subheading";

export const Signup = () => {
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
          ></Inputbox>
          <Inputbox
            label={"Last Name"}
            placeholder={"Doe"}
            type={"text"}
          ></Inputbox>
          <Inputbox
            label={"Email"}
            placeholder={"JonDoe@gmail.com"}
            type={"text"}
          ></Inputbox>
          <Inputbox
            label={"password"}
            placeholder={""}
            type={"password"}
          ></Inputbox>

          <div className="pt-4">
          <Button label={"Sign Up"}></Button>
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
