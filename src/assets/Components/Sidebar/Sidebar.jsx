import React from "react";
import "./Sidebar.css";

function Sidebar(props) {
  return (
    <div className="Sidebar">
      <div className="logo_container">
        <img src="/vite.svg" alt="" />
      </div>
      <ul className="sidebarContent">
        <li className="sidebar_link" onClick={props.downloadImage}>
          <img
            className="sidebar_link_icon"
            src="/Images/saveicon.svg"
            alt=""
          />{" "}
          Save
        </li>
        <li className="sidebar_link">
          <img className="sidebar_link_icon" src="/Images/mail.svg" alt="" />{" "}
          Mail
        </li>
        <li
          className="sidebar_link"
          onClick={props.setShowBackgroundImageEditor}
        >
          <img className="sidebar_link_icon" src="/Images/image.svg" alt="" />{" "}
          Background Image
        </li>
        <li className="sidebar_link" onClick={props.setShowTextColorPicker}>
          <img
            className="sidebar_link_icon"
            src="/Images/textcolor.svg"
            alt=""
          />{" "}
          Text Color
        </li>
        <li
          className="sidebar_link"
          onClick={props.setShowBackgroundColorPicker}
        >
          <img
            className="sidebar_link_icon"
            src="/Images/backgroundcolor.svg"
            alt=""
          />{" "}
          Background Color
        </li>
        <li className="sidebar_link" onClick={props.setShowImageEditor}>
          <img className="sidebar_link_icon" src="/Images/images.svg" alt="" />{" "}
          Add Image(s)
        </li>
        <li className="sidebar_link" onClick={props.setShowTextEditor}>
          <img
            className="sidebar_link_icon contain"
            src="/Images/text.png"
            alt=""
          />{" "}
          Text
        </li>
        <li className="sidebar_link">
          <img className="sidebar_link_icon" src="/Images/share.svg" alt="" />{" "}
          Share
        </li>
        <li className="sidebar_link">
          <img className="sidebar_link_icon" src="/Images/reseat.svg" alt="" />{" "}
          Reset
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
