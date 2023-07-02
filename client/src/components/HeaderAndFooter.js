import React from "react";

export function Header() {
  return (
    <div className="Header">
      <div></div>
      <img
        className="Logo"
        src="/static/media/countylogo.c006e75b9a0707eb4850.png"
        alt="avator"
      />
      <span>County Government of Baringo</span>
      <span>BCPSB JOB APPLICATION FORM</span>
    </div>
  );
}

export function Footer() {
  return (
    <div className="submit-wrapper bottom">
      <span>All Rights Reserved</span>
      <span>County Government of Baringo</span>
      <span>© 2022</span>
    </div>
  );
}
