import { useRecoilValue } from "recoil";
import { sendTo, token } from "../atom";
import { useState } from "react";
import Swal from 'sweetalert2';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Send = () => {
  const [amount, setAmount] = useState(0);
  const TO = useRecoilValue(sendTo);
  const authToken = useRecoilValue(token);
  const navigate = useNavigate();


  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">{TO.name.charAt(0)}</span>
              </div>
              <h3 className="text-2xl font-semibold">{TO.name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none"
                  id="amount"
                  placeholder="Enter amount"
                  onChange={(event)=>{
                    setAmount(parseInt(event.target.value));
                  }}
                />
              </div>
              <button className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              onClick={()=>{
                  if(amount<=0){
                    Swal.fire({
                      icon: "error",
                      title: "Inappropriate Amount",
                      text: "This amount can not be sent, Please enter a valid amount.",
                    });
                  }
                  else{
                    const sendRequest = async()=>{
                      try{
                        const response = await axios.post('http://localhost:3000/api/v1/account/transfer',{
                          amount:amount,
                          to:TO.id,
                        },{
                          headers:{
                            authorization:`Bearer ${authToken}`,
                          }
                        });

                        if(response.data.message==="balance is insufficient"){
                          Swal.fire({
                            icon: "error",
                            title: "Insufficient Balance",
                            text: "Check your balance and try again!",
                          });
                        }
                        else if(response.data.message==="Fund transfered successfully!"){
                          Swal.fire({
                            title: "Transfer Succeccful!",
                            text: "The amount is transfered successfully!",
                            icon: "success"
                          });
                          navigate('/dashboard');
                        }
                      }catch(error){
                        Swal.fire({
                          icon: "error",
                          title: "Error",
                          text: "Error in fond Transfer Please try again.",
                        });
                      }
                    }
                    sendRequest();
                }
              }}>
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
