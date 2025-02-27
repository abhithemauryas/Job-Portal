import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utile/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const params= useParams();
 const dispatch=useDispatch()
 const {applicants}=useSelector(store=>store.application)
  useEffect(()=>{
    const fetchAllApplications=async()=>{
      try {
        const res=await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true});
        console.log(res.data, "resssssssssssss")
          dispatch(setAllApplicants(res.data.job))
      } catch (error) {
        console.log(error)
      }

    }
    fetchAllApplications()
  },[])
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold-text">Applicants {applicants?.applications?.length}</h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
