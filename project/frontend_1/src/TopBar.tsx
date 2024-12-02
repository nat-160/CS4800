import { useState } from 'react'
import './TopBar.css'
import { Link, useNavigate } from 'react-router-dom'

function TopBar() {
  var username = window.localStorage.getItem("username");
  var password = window.localStorage.getItem("password");

  const navigate = useNavigate();

  function logoutUser() {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("password");
    navigate("/");
  }

  return (
    <div className="topBar">
      <img src="/dynamix_logo.png" className="logo topbarItem"></img>
      <div className="dropdown topbarItem">
        <button className="abutton">{username == null ? "not found" : username}</button>
        <div className="dropdown-content">
          <Link to="/app/playlist">Your Playlist</Link>
          <Link to="/app/genresurvey">Genre Survey</Link>
          <Link to="/app/songsurvey">Song Survey</Link>
          <Link to="/app/delete" className="deleteButton">Delete Account</Link>
        </div>
      </div>
      <button className="abutton topbarItem dbutton" onClick={logoutUser}>Logout</button>
      
    </div>
  )
}

export default TopBar 