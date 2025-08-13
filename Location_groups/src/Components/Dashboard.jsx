import React from "react";
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

function Dashboard() {

      const[activeTab,setActiveTab]=useState('locations');
      const[showModal,setShowModal]=useState(false);


  return (
    <>
    
      <div className="nav-main-cantainer">
        <Navbar />
      </div>
      <div className="main">

      <div className="location-section">
          <div className="loc-left">
          <ArrowLeft className="left-icon"/>
        <h5 >
          LOCATIONS
        </h5>
          </div>
        <button className="loc-right">
          <RiFileExcel2Line size={24} className="excel-icon"/>
          Export to Excel
        </button>
      </div>

      <div className="loc-group-button">
        <button className={`btn ${activeTab==='locations'?'active':''}`}  onClick={()=>setActiveTab('locations')}>LOCATIONS</button>
        <button className={`btn ${activeTab==='groups'?'active':''}`} onClick={()=>setActiveTab('groups')}>GROUPS</button>
      </div>

        <div className="content-wrapper">
    

        <div className="contents">
          {activeTab==='locations'?(
            <Locationcontent onAddClick={()=>setShowModal(true)}/>
          ):(
            <Groupscontent onAddClick={()=>setShowModal(true)}/>
          )}
        </div>
      </div>

      </div>
            {showModal&&
            <AddGroupModal onClose={()=>setShowModal(false)} title={activeTab}/>
            }
      
    
    </>
  );
}

export default Dashboard;
