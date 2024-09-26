import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [input, setinput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    file: "",
  });
  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setinput({ ...input, file: e.target.files?.[0] });
  };
  const SubmitHandler=async(e)=>{
    e.preventDefault();
    console.log(input)
  }


  return (
    <div>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={SubmitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter Full Name"
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email"
            value={input.email}
            name="email"
            onChange={changeEventHandler}
             
              placeholder="Enter Email..." />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="Number"
              name="phoneNumber"
              value={input.phoneNumber}
               onChange={changeEventHandler}
              placeholder="Enter Mobile Number"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter Your Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role==="student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role==="recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer" />
            </div>
          </div>
          <Button type="submit" className="w-full my-4 !bg-black text-white">
            Signup
          </Button>
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
