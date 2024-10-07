import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shared/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/description/:id" element={<JobDescription />} />
          //Admin Route
          <Route path="/admin/companies" element={<Companies />} />
          <Route path="/admin/jobs" element={<AdminJobs/>} />
          <Route path="/admin/companies/create" element={<CompanyCreate />} />
          <Route path="/admin/companies/:id" element={<CompanySetup/>} />
          <Route path="/admin/jobs/create" element={<PostJob/>} />
          <Route path="/admin/jobs/:id/applicants" element={<Applicants/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
