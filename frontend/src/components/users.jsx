import { useState } from "react"
import { Button } from "./button"

export const Users=()=>{

    const [users, Setusers] = useState([{
        firstName:'Chinmay',
        lastName:"Inamdar",
        _id:1
    },
    {
        firstName:'Harkirat',
        lastName:"Singh",
        _id:2
    },
])
    return (
        <div>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div>
                <input type="text" name="usersearch" id="usersearch"  placeholder="Search users" className="border border-slate-500 rounded-md focus:outline-none py-0.5 w-full px-2 mt-4"/>
            </div>
            <div className="mt-3">
                {users.map(user=> <User user={user}/>)}
            </div>
        </div>
    )
}


function User({user}){
    return (
        <div className="flex justify-between">
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
                <Button label={'Send Money'}></Button>
            </div>
        </div>
    )
}