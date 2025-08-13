import { Route,Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Longin } from "./pages/Login"
import { Profile } from "./pages/Profile"

function App() {
  return (
    <>
    <div className="bg-gray-900 min-h-screen text-white">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Longin/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
      </div>
    </>
  )
}

export default App
