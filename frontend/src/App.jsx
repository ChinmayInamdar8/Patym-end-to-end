import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/signup"
import { Signin } from "./pages/signin"
import { Dashboard } from "./pages/dashbord"
import { Send } from "./pages/send"
import { RecoilRoot } from "recoil"

function App() {

  return (
   <RecoilRoot>
     <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/send" element={<Send/>} />
    </Routes>
    </BrowserRouter>
   </RecoilRoot>
  )
}

export default App
