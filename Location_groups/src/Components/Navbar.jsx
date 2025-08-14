import React from "react";
import {
  ChartNoAxesColumn,
  FileChartColumn,
  BookOpenText,
  ChartNoAxesCombined,
} from "lucide-react";

import { TbBrandSpeedtest } from "react-icons/tb";
import "./Styles/navbar.css";
import { BsSpeedometer } from 'react-icons/bs';
function Navbar() {
  return (
    <div className="nav-container">

    <div className="Nav-Container-left">
      <div className="nav-logo">
        <button className="logo-icon-button">
          <ChartNoAxesColumn className="logo-icon" size={30}/>
        </button>
        <div className="logo-text">
          <h2>updapt</h2>
          <p>An ESG Tech Co.</p>
        </div>
      </div>

      <div className="button-groups">
        <button className="nav-buttons">
          <BsSpeedometer size={24}/>
          DASHBOARD
        </button>
        <button className="nav-buttons">
          <BookOpenText />
          TRACKING
        </button>
        <button className="nav-buttons">
          <FileChartColumn />
          REPORTS
        </button>
        <button className="nav-buttons">
          <ChartNoAxesCombined />
          ANALYTICS
        </button>
      </div>
      
      
    </div>
      <div className="nav-left">
        <button className="Profile-icon">
            A
        </button>

      </div>
    </div>
      
  );
}

export default Navbar;
