// import { FolderUp, Map, MapPin, MoveUpLeft, Search } from "lucide-react";
// import React from "react";
// import "./Styles/locationcontent.css";
import { RiFolderUploadFill } from "react-icons/ri";
// import { useState } from "react";
import { PiMapPinFill } from "react-icons/pi";
import { BiSolidPencil } from "react-icons/bi";
import { IoIosPin } from "react-icons/io";

import React, { useState } from "react";
import "./Styles/locationcontent.css";
import { AlertCircle, Search, Trash2 } from "lucide-react";



export default function Locationcontent({ onAddClick, locations,onDelete }) {
  const [selectedId, setSelectedId] = useState();

  const [searchTerm, setSearchTerm] = useState("");
  const filteredLocations = locations.filter(
    (loc) =>
      loc.assetname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const modifiedSelected = selectedId
    ? {
        "Asset Name": selectedId.assetname,
        "Asset Type": selectedId.assettype,
        Country: selectedId.country,
        Address: selectedId.address,
      }
    : {};

  console.log("modifiedArray", modifiedSelected);

  console.log("selectedId", selectedId);
  console.log(locations);

  const [openDelete, setOpenDelete] = useState(false);
  const confirmDelete = async ()=>{
      setSelectedId(null);
        setOpenDelete(false);
        await onDelete(selectedId._id)
  }

  return (
    <div className="container">
      <div className="locations-panel">
        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="search-icon" />
          </div>
          <div className="add-section">
            <button className="add-location-btn" onClick={onAddClick}>
              Add Location
            </button>
            <RiFolderUploadFill className="upload-icon" size={34} />
          </div>
        </div>
        <div className="locations-list">
          {filteredLocations.map((loc) => (
            <div
              key={loc._id}
              className="location-item"
              onClick={() => setSelectedId(loc)}
            >
              <div className="location-icon">
                <IoIosPin size={20} />
              </div>
              <div>
                <h5>{loc.assetname}</h5>
                <p>{loc.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      {selectedId && (
        <div className="details-panel">
          <div className="detail-header">
            <div className="left-header">
              <IoIosPin className="location-icon" />
              <h3>3Mar2025 session check</h3>
            </div>
            <div className="right-header">
              <Trash2
                size={20}
                color="red"
                onClick={() => setOpenDelete(true)}
              />
              <BiSolidPencil size={20} color="grey" />
            </div>
          </div>
          <h4>Location Information</h4>
          <div className="details-scroll">
            {/* {selectedId.map((item,index)=>{ */}
            {Object.entries(modifiedSelected).map(([key, value]) => (
              <div key={key} className="detail-row">
                <span className="detail-key">{key}</span>
                <span className="detail-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {openDelete && (
        <>
          <div
            className="overlay-delete"
            onClick={() => setOpenDelete(false)}
          ></div>
          <div className="modal-delete">
            <div className="modal-header-delete">
              <AlertCircle color="#e53935" size={32}/>
              <h2>Delete Confirmation</h2>
            </div>
            <p>Once deleted, the data cannot be recovered.</p>
            <p>Are you sure you want to proceed?</p>
          <div className="modal-actions">
            <button className="btn-outline" onClick={()=>setOpenDelete(false)}>Cancel</button>
            <button className="btn-danger" onClick={
              confirmDelete
            }>Delete</button>
          </div>

          </div>
        </>
      )}
    </div>
  );
}
