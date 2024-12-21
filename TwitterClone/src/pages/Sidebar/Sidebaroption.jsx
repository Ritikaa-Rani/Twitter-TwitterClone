// import React from "react";
import "./Sidebaroption.css";
import PropTypes from "prop-types";
const Sidebaroption = ({ Icon, text, active }) => {
  return (
    <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
      <Icon />
      <h2>{text}</h2>
    </div>
  );
};

Sidebaroption.propTypes = {
    Icon: PropTypes.elementType, // Ensures Icon is a React component
    text: PropTypes.string,     // Ensures text is a string
    active: PropTypes.bool,     // Ensures active is a boolean
  };

export default Sidebaroption;
