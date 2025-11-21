import { BrowserRouter, Route,Routes } from "react-router"
import Body from "./components/Body"
import Profile from "./components/Profile"
import Login from "./components/Login"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"

function App() {

  return (
    <>
      <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
            <Route path="/" element={<Feed/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/login" element={<Login/>}/>
        </Route>
        
      </Routes>
      </BrowserRouter>

      {/* <h1 className="text-2xl font-bold underline">
        Hello world!
      </h1> */}
      </Provider>
    </>
  )
}

export default App
