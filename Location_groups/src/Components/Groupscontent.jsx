import { Search, ToggleLeftIcon, Trash2 } from "lucide-react";

import { IoIosPin } from "react-icons/io";
import './Styles/groupcontent.css'
import { PiMapPinLineFill } from "react-icons/pi";
import { GiPathDistance } from "react-icons/gi";

import { LiaToggleOnSolid } from "react-icons/lia";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import {  FaEdit, FaTrash } from "react-icons/fa";
import { BiSolidPencil } from "react-icons/bi";

const data = [
  {
    id: 1,
    type: "group",
    name: "Grp-Loc-A",
    locations: [],
    groups: [
      {
        id: 11,
        type: "group",
        name: "Grp-Loc-1",
        locations: [
          { id: 111, type: "location", name: "Aston", address: "Aston, Birmingham, England." },
          { id: 112, type: "location", name: "23", address: "VC" },
          { id: 113, type: "location", name: "Leicester", address: "Leicester, East Midlands, England." }
        ],
        groups: []
      },
      {
        id: 12,
        type: "group",
        name: "Annual Grp-3",
        locations: [],
        groups: [
          {
            id: 121,
            type: "group",
            name: "SubGrp-1",
            locations: [
              { id: 1211, type: "location", name: "London", address: "London, UK" }
            ],
            groups: []
          }
        ]
      }
    ]
  },
  {
    id: 2,
    type: "group",
    name: "Grp-2",
    locations: [
      { id: 221, type: "location", name: "Mumbai", address: "Mumbai, India" }
    ],
    groups: []
  }
];
function Groupscontent() {

    // const[selectedItem,setSelectedItem]=useState(null);
      const [path, setPath] = useState([{ levelData: data, title: "Root" }]);

  const handleSelect = (item, levelIndex) => {
    // Slice the path up to current level, then add new level
    const newPath = path.slice(0, levelIndex + 1);

    if (item.type === "group") {
      const nextData = item.groups.length > 0 ? item.groups : item.locations;
      newPath.push({
        levelData: nextData,
        title: item.name,
        isLocationLevel: item.groups.length === 0
      });
    }
    setPath(newPath);
  };


  const handleBack = (index) => {
    setPath((prev) => prev.slice(0, index + 1));
  };



  return (
    <div className="container">
      <div className="locations-panel">
        <div className="search-section">
          <div className="search-bar">
            <input type="text" placeholder="search" />
            <Search className="search-icon" />
          </div>

           <div className="add-section">
          <LiaToggleOnSolid className="upload-icon" size={34} color="#22b363ff"/>
          <button className="add-location-btn">Add Group</button>
            </div>     
        </div>
        <div className="locations-list">
          {data.map((loc, value) => (
            <div key={value} className="location-item" onClick={()=>handleSelect(loc)}>
              <div className="location-icon">
                <GiPathDistance size={25} />
              </div>
                <div >
                  <h5>{loc.name}</h5>
                    <div className="text-align">
                  <small><IoIosPin color="#2ffd20ff" size={18}/> No. of locations : {loc.locationsCount}</small>
                  <small><GiPathDistance size={20} color="#4074ff"/> No. of groups : {loc.groupsCount}</small>

                    </div>
                </div>
       
            </div>
          ))}
        </div>
      </div>

      {/* right section */}

        <div className="drill-right">
        {path.map((level, index) => (
        <div key={index} className="drill-column">
          <div className="drill-header">
            <div className="drill-header-left">
            <GiPathDistance size={34} className="location-icon"/>
            {level.title}
            </div>
            <div>
             <Trash2 size={20} color="red"/>
            <BiSolidPencil size={20} color="grey"/>
            </div>
            </div>
          {level.levelData.length > 0 ? (
            level.levelData.map((item) => (
              <div
                key={item.id}
                className="drill-card"
                onClick={() =>
                  !level.isLocationLevel && handleSelect(item, index)
                }
              >
                <div className="drill-card-header">
                  {item.type === "group" ? (
                    <MdGroups className="icon" />
                  ) : (
                    <FaMapMarkerAlt className="icon" />
                  )}
                  {item.name}
                
                  {item.type === "location" && (
                    <FaRegCalendarAlt className="calendar-icon" />
                  )}
                </div>
                {item.type === "group" ? (
                  <div className="drill-meta">
                    
                    <span><FaMapMarkerAlt /> {item.locations.length} locations</span>
                    <span><MdGroups /> {item.groups.length} groups</span>
                  </div>
                ) : (
                  <div className="drill-meta">{item.address}</div>
                )}
              </div>
            ))
          ) : (
            <p className="no-data">No data</p>
          )}
        </div>
      ))}
      </div>
    </div>
  );
}

export default Groupscontent;
