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
    <div className="ui secondary pointing menu">
      <NavLink exact to="/" className="item">
        Home
      </NavLink>
      <NavLink exact to="/albums" className="item">
        My Albums
      </NavLink>
      <div className="right menu">
        {!currentUser && (
          <>
            <NavLink exact to="/sign_in" className="ui black button">
              Sign In
            </NavLink>
            <NavLink exact to="/sign_up" className="ui black button">
              Sign Up
            </NavLink>
          </>
        )}
        {currentUser && (
          <>
            <div>
              Hello {currentUser.full_name}
            </div>
            <button
              className="ui inverted red button"
              onClick={handleSignOutClick}
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};