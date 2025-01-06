import { BottomWarning } from "../components/bottomwarning"
import { Button } from "../components/button"
import { Heading } from "../components/heading"
import { Inputbox } from "../components/inputbox"
import { SubHeading } from "../components/subheading"

export const Signin = ()=>{
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
              <div className="flex flex-col justify-center">
                <div className="rounded-md bg-white w-85 text-center p-2 h-max px-4">
                  <Heading title={"Sign In"}></Heading>
                  <SubHeading title={"Enter your credentials to access your account"}></SubHeading>
                  <Inputbox label={"Email"} placeholder={"Jondoe@gmial.com"} type={"text"}></Inputbox>

                  <Inputbox label={"Password"} placeholder={""} type={"Password"}></Inputbox>

                  <div className="pt-4">
                    <Button label={"Sign In"}></Button>
                  </div>

                  <BottomWarning label={"Don't have an account?"} where={" Sign Up"} to={"/signup"}></BottomWarning>
                </div>
              </div>
            </div>
    )
}