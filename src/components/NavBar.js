import React from "react";
import { NavLink } from "react-router-dom";

export const NavBar = ({ currentUser, onSignOut }) => {
  const handleSignOutClick = event => {
    event.preventDefault();
    if (typeof onSignOut === "function") {
      onSignOut();
    }
  };
  return (
    <div className="ui secondary menu">
        <NavLink exact to="/albums" className="ui white button">
          My Albums
        </NavLink>
        <NavLink exact to="/albums/new" className="ui white button">
          New Albums
        </NavLink>
        <div className="right menu">
          <div className="ui black button " >
              Hello {currentUser.full_name}
          </div>
          <button
            className="ui inverted red button"
            onClick={handleSignOutClick}
          >
            Sign Out
          </button>
        </div>
    </div>
  );
};