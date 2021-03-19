import React, { useState } from "react";
import { IntervalContainer } from "./style";
import { CaretDownOutlined } from "@ant-design/icons";
import { Button } from "../common";

export const IntervalScreen = () => {
  const [showDropdown, setShowDropdown] = useState({
    dropdownOne: { open: false, text: "hours" },
    dropdownTwo: { open: false, text: "hours" },
    dropdownThree: { open: false, text: "hours" },
  });

  const handleDropdown = (name) => {
    setShowDropdown({ ...showDropdown, [name]: {...showDropdown[name], open: !showDropdown[name].open }});
  };

  const handleDropdownChange = (name)=> {
    setShowDropdown({ ...showDropdown, [name]: {...showDropdown[name], text: showDropdown[name].text=== 'hours'? 'min': 'hours', open: !showDropdown[name].open }});
  }
  const dropdown = (dropdownName) => {
    return (
      <>
        <p>
          {showDropdown[dropdownName].text}
          <CaretDownOutlined
            className="dropdown-icon"
            onClick={() => handleDropdown(dropdownName)}
          />
          {showDropdown[dropdownName].open && <p className="dropdown-list" onClick={()=> handleDropdownChange(dropdownName)}>{showDropdown[dropdownName].text === 'hours'? 'min': 'hours'}</p>}
        </p>
      </>
    );
  };
  return (
    <IntervalContainer>
      <div className="interval-wrapper">
        <p>Refresh interval</p>
        <p>5</p>
        {dropdown("dropdownOne")}
      </div>
      <div className="interval-wrapper">
        <p>Update map intervel (between8:00 pm and 6:00 am)</p>
        <p>
          5 <sub>am</sub>
        </p>
        <p>
          8 <sub>pm</sub>
        </p>
      </div>
      <div className="interval-wrapper">
        <p>interval for sending GPS data</p>

        <p>5</p>
        {dropdown("dropdownTwo")}
      </div>
      <div className="interval-wrapper">
        <p>Refresh Web Page Interval</p>
        <p>5</p>
        {dropdown("dropdownThree")}
      </div>
      <Button className="interval-save-button" name={"Save"} />
    </IntervalContainer>
  );
};
