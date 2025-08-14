import React, { useEffect } from "react";
import Navbar from "./Navbar";
import "./Styles/dashboard.css";
import { ArrowLeft, Search, ToggleRight } from "lucide-react";
import { RiFileExcel2Line } from "react-icons/ri";
import { useState } from "react";
import Locationcontent from "./Locationcontent";
import Groupscontent from "./Groupscontent";
import { RiFolderUploadFill } from "react-icons/ri";
import { PiToggleRightFill } from "react-icons/pi";
import AddGroupModal from "./AddGroupModal";
import axios from "axios";
import toast from "react-hot-toast";
const api = axios.create({
  baseURL: "http://localhost:5001/api",
});
function Dashboard() {
  const [activeTab, setActiveTab] = useState("locations");
  const [showModal, setShowModal] = useState(false);

  const [locations, setLocations] = useState([]);
  const [groups, setGroups] = useState([]);

  const[isUpdated,setIsUpdated]=useState(false);

  const getLocation = async () => {
    try {
      const response = await api.get('/location');
      console.log("Location response",response.data.data)
      setLocations(response.data.data);
      setIsUpdated(false);
    } catch (err) {
      console.error("error while loading locations", err);
    }
  };
    const getGroups = async () => {
    try {
      const response = await api.get('/group');
      console.log("group response",response.data.data)
      setGroups(response.data.data);
      setIsUpdated(false);
    } catch (err) {
      console.error("error while loading locations", err);
    }
  };

  useEffect(() => {
    getLocation();
    getGroups();
  }, [isUpdated]);

const  createLocation=async(locations)=>{
      try {
        const response = await api.post("/location", locations);
        setIsUpdated(true);
        toast.success("Location added")  

        console.log(response);
      } catch (err) {
        console.log(err);
      }
  }

const  createGroup=async(groups)=>{
      try {
        const response = await api.post("/group", groups);
        setIsUpdated(true);
        toast.success("Group added")  

        console.log(response);
      } catch (err) {
        console.log(err);
      }
  }

  const deleteLoction=async(id)=>{
        try{
        const response=await axios.delete(`http://localhost:5001/api/location/${id}`)

      
        setIsUpdated(true);
        toast.success("Location Deleted ")
        console.log("deletion Successfull",response);

    }catch(err){
      console.log("error while deleting",err)
    }
  }

  return (
    <>
      <div className="nav-main-cantainer">
        <Navbar />
      </div>
      <div className="main">
        <div className="location-section">
          <div className="loc-left">
            <ArrowLeft className="left-icon" />
            <h5>LOCATIONS</h5>
          </div>
          <button className="loc-right">
            <RiFileExcel2Line size={24} className="excel-icon" />
            Export to Excel
          </button>
        </div>

        <div className="loc-group-button">
          <button
            className={`btn ${activeTab === "locations" ? "active" : ""}`}
            onClick={() => setActiveTab("locations")}
          >
            LOCATIONS
          </button>
          <button
            className={`btn ${activeTab === "groups" ? "active" : ""}`}
            onClick={() => setActiveTab("groups")}
          >
            GROUPS
          </button>
        </div>

        <div className="content-wrapper">
          <div className="contents">
            {activeTab === "locations" ? (
              <Locationcontent onAddClick={() => setShowModal(true)} locations={locations} onDelete={deleteLoction}/>
            ) : (
              <Groupscontent onAddClick={() => setShowModal(true)} data={groups}/>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <AddGroupModal onClose={() => setShowModal(false)} title={activeTab} locations={locations} groups={groups} onCreateLoction={createLocation} onCreateGroup={createGroup}/>
      )}
    </>
  );
}

export default Dashboard;
