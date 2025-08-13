// import { FolderUp, Map, MapPin, MoveUpLeft, Search } from "lucide-react";
// import React from "react";
// import "./Styles/locationcontent.css";
import { RiFolderUploadFill } from "react-icons/ri";
// import { useState } from "react";
import { PiMapPinFill } from "react-icons/pi";
import { BiSolidPencil } from "react-icons/bi";
import { IoIosPin } from "react-icons/io";

import React from "react";
import "./Styles/locationcontent.css";
import { Search, Trash2 } from "lucide-react";

const locations = [
  { id: 1, name: "Globall245", address: "Bommasandra, Bangalore" },
  { id: 2, name: "1 All dps-new", address: "ssssdgf" },
  { id: 3, name: "23", address: "VC" },
  { id: 4, name: "354", address: "3" },
  { id: 5, name: "3Mar2025 session check", address: "dd" },
  { id: 6, name: "45", address: "56" },
  { id: 7, name: "54343dfd", address: "rest uhus..." },
  { id: 8, name: "A LOCATION FEAT", address: "test" },
];

const locationDetails = {

  "Asset Name": "3Mar2025 session check",
  "Asset Type": "Plant",
  "Country":"-",
  "Address": "dd",
  
};

export default function Locationcontent() {
  return (
    <div className="container">

      <div className="locations-panel">
      
          <div className="search-section">
           <div className="search-bar">
             <input type="text" placeholder="search" />
             <Search className="search-icon" />
           </div>
           <div className="add-section">
           <button className="add-location-btn">Add Location</button>
           <RiFolderUploadFill className="upload-icon" size={34} />
           </div>
         </div>
        <div className="locations-list">
          {locations.map((loc) => (
            <div key={loc.id} className="location-item">
                 <div className="location-icon">
                   
                    <IoIosPin size={20}/>
                 </div>
                 <div>
              <h5>{loc.name}</h5>
              <p>{loc.address}</p>
                 </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="details-panel">
        <div className="detail-header">
          <div className="left-header">
          <IoIosPin className="location-icon"/>
          <h3>3Mar2025 session check</h3>
          </div>
          <div className="right-header">
            <Trash2 size={20} color="red"/>
            <BiSolidPencil size={20} color="grey"/>
          </div>
        </div>
        <h4>Location Information</h4>
        <div className="details-scroll">
          {Object.entries(locationDetails).map(([key, value]) => (
            <div key={key} className="detail-row">
        
              <span className="detail-key">{key}</span>
              <span className="detail-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
