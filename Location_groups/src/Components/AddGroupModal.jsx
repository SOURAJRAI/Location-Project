import React, { useState } from "react";
import "./Styles/Addgroup.css";
import { Search, X } from "lucide-react";
import { IoLocationSharp } from "react-icons/io5";

function AddGroupModal({ onClose, title }) {
  const [groupName, setGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const locations = [
    { id: 1, name: "1 All dps-new", desc: "ssssdgf" },
    { id: 2, name: "23", desc: "VC" },
    { id: 3, name: "354", desc: "3" },
    { id: 4, name: "3Mar2025 session check", desc: "dd" },
    { id: 5, name: "45", desc: "56" },
    { id: 6, name: "54343dfd", desc: "rest uhushjk jkjk" },
    { id: 7, name: "A LOCATION FEAT", desc: "test" },
  ];

  const filteredLocations = locations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="Group-modal-header">
          <div>
            {title === "locations" ? (
                <h4>ADD NEW LOCATION</h4>
            ) : (
              <h3>CREATE NEW GROUP</h3>
            )}
          </div>
          <button className="Group-close-btn" onClick={onClose}>
            <X className="group-close-icon" strokeWidth={4} color="black"/>
          </button>
        </div>
        <div className="modal-body">
          {title === "groups" ? (
            <>
              <div className="left-section">
                <label className="label">Group Name</label>
                <input
                  type="text"
                  className="input"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Enter group name"
                />

                <label className="label">Select Locations or Groups</label>
                <select className="input">
                  <option>Locations</option>
                  <option>Groups</option>
                </select>
              </div>

              <div className="right-section">
                {/* <div className="right-header"> */}
                <span className="loc-title">
                  <IoLocationSharp color="#00b894" /> Locations :{" "}
                  {selectedIds.length}
                </span>
                <div className="group-search-bar">

                <input
                  type="text"
                  className="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  />
                <Search color="#6a6a6aff"/>
                  </div>
                {/* </div> */}

                <div className="location-list">
                  {filteredLocations.map((loc) => (
                    <div key={loc.id} className="group-location-item">
                      <div className="loc-info">
                        <button className="loc-info-icon">
                          <IoLocationSharp size={18} color="#00b894" />
                        </button>
                        <div>
                          <div className="loc-name">{loc.name}</div>
                          <div className="loc-desc">{loc.desc}</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(loc.id)}
                        onChange={() => toggleSelect(loc.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="group-location-section">
                <label className="location-label">
                  Asset Name<span>* </span>
                </label>
                <input
                  type="text"
                  className="location-input"
                  placeholder="Enter group name"
                />

                <label className="location-label">
                  Asset Type<span>* </span>
                </label>
                <select className="location-input">
                  <option>Please select asset type</option>
                  <option>Office</option>
                  <option>Buildings</option>
                  <option>Others</option>
                </select>
                <label className="location-label">Headquaters</label>
                <div className="radios">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="hq"
                      className="location-input"
                      value="yes"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="hq"
                      className="location-input"
                      value="no"
                    />
                    <span>No</span>
                  </label>
                </div>
                         <label className="location-label">
                  Country<span>* </span>
                </label>
                <select className="location-input">
                  <option>Please select asset type</option>
                  <option>India</option>
                  <option>Australia</option>
                  <option>UAE</option>
                  <option>UK</option>
                  <option>United States</option>
                </select>
                         <label className="location-label">
                 Address<span>* </span>
                </label>
                <textarea className="location-input"/>
              </div>
            </>
          )}
        </div>
        {/* FOOTER */}
        <div className="group-modal-footer">
          <button className="group-add-btn">Add</button>
        </div>
      </div>
    </>
  );
}

export default AddGroupModal;
