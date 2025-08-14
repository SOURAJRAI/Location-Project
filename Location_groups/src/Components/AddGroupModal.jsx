import React, { useEffect, useState } from "react";
import "./Styles/Addgroup.css";
import { GroupIcon, Search, UserRoundCog, X } from "lucide-react";
import { IoLocationSharp } from "react-icons/io5";
import { GiPathDistance } from "react-icons/gi";
import { IoIosPin } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";

import axios from "axios";
import { TbUsersGroup } from "react-icons/tb";



function AddGroupModal({ onClose, title, locations ,groups,onCreateLoction,onCreateGroup}) {
  const [searchTerm, setSearchTerm] = useState("");

  const [selected, setSelected] = useState("Locations");
  console.log("selected Option", selected);

  const [countries, setCountries] = useState([]);

  // const locations = [
  //   { id: 1, name: "1 All dps-new", desc: "ssssdgf" },
  //   { id: 2, name: "23", desc: "VC" },
  //   { id: 3, name: "354", desc: "3" },
  //   { id: 4, name: "3Mar2025 session check", desc: "dd" },
  //   { id: 5, name: "45", desc: "56" },
  //   { id: 6, name: "54343dfd", desc: "rest uhushjk jkjk" },
  //   { id: 7, name: "A LOCATION FEAT", desc: "test" },
  // ];

  const filteredLocations = locations.filter(
    (loc) =>
      loc.assetname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name,cca3")
      .then((data) => {
        const sortedData = data.data.sort((a, b) =>
          a.name.common.localeCompare(b.name?.common)
        );
        console.log("sorted Data", sortedData);
        setCountries(sortedData);
      })
      .catch((err) => console.log("Error while retrieving data", err));
  }, []);

  const [assetName, setAssetName] = useState("");
  const [assetType, setAssetType] = useState("");
  // const [isHQ, setIsHQ] = useState(false);
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");

  //groupState
  const [groupName, setGroupName] = useState();
  const [selectedLocationIds, setselectedLocationIds] = useState([]);
  const [selectedGroupIds, SetselectedGroupIds] = useState([]);

    const toggleSelect = (id) => {
    setselectedLocationIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const toggleSelectGroups = (id) => {
    SetselectedGroupIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  console.log("Selected group",selectedGroupIds);



  const handleSave = async () => {
    if (title === "locations") {
      try {
        const locations = {
          assetname: assetName.trim(),
          assettype: assetType.trim(),
          country: country.trim(),
          address: address,
        };
        console.log("created location", locations);
        // const response = await api.post("/location", locations);
        await onCreateLoction(locations)
     
        onClose();

      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const groups = {
          name: groupName,
          groups: selectedGroupIds,
          locations: selectedLocationIds,
        };

        console.log("selected Groups", groups);
        // const response=await api.post("/group",groups)
        // console.log("created group",response)
        onCreateGroup(groups);

        onClose();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // const handleReset=()=>{
  //   setAssetName("");
  //   setAssetType("");
  //   setCountry("");
  //   setAddress("");
  // }

  console.log("countries", countries);
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
            <X className="group-close-icon" strokeWidth={4} color="black" />
          </button>
        </div>
        <div className="modal-body-group">
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
                <select
                  className="input"
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <option>Locations</option>
                  <option>Groups</option>
                </select>
              </div>

              <div className="right-section">
                {/* <div className="right-header"> */}
                  {selected ==='Locations' ? (
                <span className="loc-title">

                    <IoLocationSharp color="#00b894" /> Locations :{" "}
                    {selectedLocationIds.length}
                </span>
                  ):(
                       <span className="loc-title">

                    <GiPathDistance color="#4074ff" size={24}/> Groups :{" "}
                    {selectedGroupIds.length}
                </span>
                  )

                  }
                <div className="group-search-bar">
                  <input
                    type="text"
                    className="search"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search color="#6a6a6aff" />
                </div>
                {/* </div> */}

                <div className="location-list">
                  {selected === "Locations" ? (
                    filteredLocations.map((loc) => (
                      <div key={loc.id} className="group-location-item">
                        <div className="loc-info">
                          <button className="loc-info-icon">
                            <IoLocationSharp size={18} color="#00b894" />
                          </button>
                          <div>
                            <div className="loc-name">{loc.assetname}</div>
                            <div className="loc-desc">{loc.address}</div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedLocationIds.includes(loc._id)}
                          onChange={() => toggleSelect(loc._id)}
                        />
                      </div>
                    ))
                  ) : (
                    filteredGroups.map((item)=>(
                    
                    <div className="add-drill-card">
                      <div className="add-card-content">
                        <div className="add-card-left">
                          <div className="add-card-icon">
                            <GiPathDistance size={20} />
                          </div>
                          <div className="card-details">
                            <h5>{item.name}</h5>

                            <div className="card-stats">
                              <div className="stat-row">
                                <FaMapMarkerAlt size={16} color="#4CAF50" />
                                <span>
                                  No. of locations : {item.locations.length}
                                </span>
                              </div>
                              <div className="stat-row">
                                <GiPathDistance size={16} color="#4074ff" />
                                <span>
                                  No. of groups : {item.groups.length}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedGroupIds.includes(item._id)}
                          onChange={() => toggleSelectGroups(item._id)}
                        />
                      </div>
                    </div>
                    ))      
                  )
                  }
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
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                />

                <label className="location-label">
                  Asset Type<span>* </span>
                </label>
                <select
                  className="location-input"
                  value={assetType}
                  onChange={(e) => setAssetType(e.target.value)}
                >
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
                <select
                  className="location-input"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option>Please select asset type</option>
                  {countries.map((country) => (
                    <option key={country.cca3}>{country.name.common}</option>
                  ))}
                </select>
                <label className="location-label">
                  Address<span>* </span>
                </label>
                <textarea
                  className="location-input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </>
          )}
        </div>
        {/* FOOTER */}
        <div className="group-modal-footer">
          <button className="group-add-btn" onClick={handleSave}>
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default AddGroupModal;
