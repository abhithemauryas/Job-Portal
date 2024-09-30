
import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import './App.css'
import Navbar from './components/shared/Navbar'
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";

function App() {
 

  return ( 
    <>
       <Router>
       <Navbar/>
        <Routes>
          <Route index path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/jobs" element={<Jobs/>}/>
          <Route path="/browse" element={<Browse/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/description/:id" element={<JobDescription/>}/>
        </Routes>
       </Router>
       
    </>
  )
}

export default App
