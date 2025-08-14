import { Calendar, Calendar1, Search, ToggleLeftIcon, Trash2 } from "lucide-react";

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

// const data = [
//   {
//     id: 1,
//     type: "group",
//     name: "Grp-Loc-A",
//     locations: [],
//     groups: [
//       {
//         id: 11,
//         type: "group",
//         name: "Grp-Loc-1",
//         locations: [
//           { id: 111, type: "location", name: "Aston", address: "Aston, Birmingham, England." },
//           { id: 112, type: "location", name: "23", address: "VC" },
//           { id: 113, type: "location", name: "Leicester", address: "Leicester, East Midlands, England." }
//         ],
//         groups: []
//       },
//       {
//         id: 12,
//         type: "group",
//         name: "Annual Grp-3",
//         locations: [],
//         groups: [
//           {
//             id: 121,
//             type: "group",
//             name: "SubGrp-1",
//             locations: [
//               { id: 1211, type: "location", name: "London", address: "London, UK" }
//             ],
//             groups: []
//           }
//         ]
//       }
//     ]
//   },
//   {
//     id: 2,
//     type: "group",
//     name: "Grp-2",
//     locations: [
//       { id: 221, type: "location", name: "Mumbai", address: "Mumbai, India" }
//     ],
//     groups: []
//   }
// ];

function Groupscontent({onAddClick,data}) {

      // const [path, setPath] = useState([{ levelData:data , title: "" }]);
      const [path, setPath] = useState([]);
      console.log("actuals dataa",data);
      
      const[searchTerm,setSearchTerm]=useState("");
  const filteredGroups = data.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleSelect = (item, levelIndex) => {
    const newPath = path.slice(0, levelIndex + 1);

    if (item.type === "group") {
      // const nextData = item.groups.length > 0 ? item.groups : item.locations;
      const nextData=[...item.groups,...item.locations]
      newPath.push({
        levelData: nextData,
        title: item.name,
        isLocationLevel: item.groups.length === 0
      });
    }
     console.log("new path",newPath)
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
            <input type="text" placeholder="search"  onChange={(e)=>setSearchTerm(e.target.value)}/>
            <Search className="search-icon" />
          </div>

           <div className="add-section">
          <LiaToggleOnSolid className="upload-icon" size={34} color="#22b363ff"/>
          <button className="add-location-btn" onClick={onAddClick}>Add Group</button>
            </div>     
        </div>
        <div className="locations-list">
          {filteredGroups.map((loc, value) => (
            <div key={value} className="location-item" onClick={()=>handleSelect(loc)}>
              <div className="location-icon">
                <GiPathDistance size={25} />
              </div>
                <div >
                  <h5>{loc.name}</h5>
                    <div className="text-align">
                  <small><IoIosPin color="#2ffd20ff" size={18}/> No. of locations : {loc.locations?.length}</small>
                  <small><GiPathDistance size={20} color="#3169ff"/> No. of groups : {loc.groups?.length}</small>

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
             <Trash2 size={20} color="red" onClick={()=>handleBack(index-1)}/>
            <BiSolidPencil size={20} color="grey"/>
            </div>
            </div>
         
          {level.levelData.map((item) => (
  <div
    key={item._id}
    className="drill-card"
    onClick={() => !level.isLocationLevel && handleSelect(item, index)}
  >
    <div className="card-content">
      <div className="card-left">
        <div className="card-icon">
          {item.type === "group" ? <GiPathDistance size={20} /> : <FaMapMarkerAlt size={20} />}
        </div>
        <div className="card-details">
          <h5>{item.type==="groups" ?item.name:item.locations?.assetname}</h5>
          {item.type === "group" ? (
            <div className="card-stats">
              <div className="stat-row">
                <FaMapMarkerAlt size={16} color="#4CAF50" /> 
                <span>No. of locations : {item.locations.length}</span>
              </div>
              <div className="stat-row">
                <GiPathDistance size={16} color="#4074ff" /> 
                <span>No. of groups : {item.groups.length}</span>
              </div>
            </div>
          ) : (
            <div className="card-address">{item.address}</div>
          )}
        </div>
      </div>
   
    
         
      <div className="card-actions">
       {item.type==="location" &&
         <Calendar color="#4074ff"/>
       
       } 
      </div>
       {
        
       }
     
    </div>
  </div>
))}


        </div>
      ))}
      </div>
    </div>
  );
}

export default Groupscontent;
