
import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import './App.css'
import Navbar from './components/shared/Navbar'
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

function App() {
 

  return (
    <>
       <Router>
       <Navbar/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>} />
        </Routes>
       </Router>
       
    </>
  )
}

export default App
