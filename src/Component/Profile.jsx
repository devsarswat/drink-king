import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { Acontext } from "../App";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin ,FaUserCircle} from 'react-icons/fa'; 


const Profile = () => {
  const { user } = useContext(Acontext);

  return (
    <div className="container-p">
      <Typography variant="h5" className="Profile-heading">Profile Section</Typography>
      <div className="main-container">
        <div
          style={{
            width: "16%",
            height: "180px",
            borderRadius: "10%",
            backgroundColor: "#ccc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Typography variant="h6" className="uname">{user.name.slice(0, 1)}</Typography> */}
          <FaUserCircle size={80} className="uname" /> 
        </div>
        <div className="p-text">
          <>
            <Typography variant="h6">Name: {user.name}</Typography>
            <Typography variant="body1">Address: 123 Main St, City, Country</Typography>
            <Typography variant="body1">Zip Code: 12345</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Typography variant="body1">Phone: +1 123-456-7890</Typography>
          </>
        </div>
      </div>
      <div className="social-media">
        <Typography variant="h6" className="s-heading" >Social Media</Typography>
        <Link to="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="s-li mx-2">
          <FaFacebook className="icons" />
        </Link>
        <Link to="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="s-li mx-2">
          <FaTwitter className="icons" />
        </Link>
        <Link to="https://www.linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="s-li mx-2">
          <FaLinkedin className="icons" />
        </Link>
      </div>
    </div>
  );
};

export default Profile;
