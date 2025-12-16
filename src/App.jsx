import { BrowserRouter, Route,Routes } from "react-router"
import Body from "./components/Body"
import Profile from "./components/Profile"
import Login from "./components/Login"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Connections from "./components/Connections"
import Requests from "./components/Requests"
import Payment from "./components/Payment"
import Chat from "./components/Chat"
import { GoogleOAuthProvider } from "@react-oauth/google"


function App() {

  return (
    <>
      <GoogleOAuthProvider clientId="358138617282-313s54tigkpij6iu3i8vrs0db2qhrq0l.apps.googleusercontent.com">
      <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
            <Route path="/" element={<Feed/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/connections" element={<Connections/>}/>
            <Route path="/requests" element={<Requests/>}/>
            <Route path="/payment" element={<Payment/>}/>
            <Route path="/chat/:targetUserId" element={<Chat/>}/>

        </Route>
        
      </Routes>
      </BrowserRouter>

      {/* <h1 className="text-2xl font-bold underline">
        Hello world!
      </h1> */}
      </Provider>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
