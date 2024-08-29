import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import TopNavHeader, { NavOption } from "../components/header/TopNavBar";
import defaultProfileImage from "../assets/default-profile.png";
import "./Profile.scss";

const Profile: React.FC = () => {
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    points: number;
    profileImage: string;
  } | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`)
      .then((response) => {
        setUser(response.data);
        setSelectedImage(response.data.profileImage || defaultProfileImage);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des informations utilisateur",
          error,
        );
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <>
      <TopNavHeader selected={NavOption.Shop} />
      <Header />
      <div style={pageBackgroundStyles}>
        {" "}
        {/* Apply the background style */}
        <div style={profileContainerStyles}>
          <div style={coverImageStyles}></div>
          <div style={profileContentStyles}>
            <img
              src={selectedImage || defaultProfileImage}
              alt="Profile"
              style={profileImageStyles}
            />
            <img
              src={require("../assets/modify.png")}
              alt="Modify"
              className={"modifyButton"}
            />
            {user ? (
              <>
                <h2 style={nameStyles}>
                  {user.firstName} {user.lastName}
                </h2>
                <div style={infoStyles}>
                  <p style={textInfoStyles}>
                    <strong>E-mail:</strong> {user.email}
                  </p>
                  <p style={textInfoStyles}>
                    <strong>Phone:</strong> {user.phoneNumber}
                  </p>
                  <p style={textInfoStyles}>
                    <strong>Points:</strong> {user.points}
                  </p>
                  <p style={textInfoStyles}>
                    <strong style={{ marginRight: "8px" }}>Orders:</strong>{" "}
                    <a href="/orders" className={"orders"}>
                      click to see your orders
                    </a>
                  </p>
                </div>
              </>
            ) : (
              <p>Loading...</p>
            )}
            <img
              src={require("../assets/logout.png")}
              alt="Logout"
              className={"logoutButton"}
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Styles
const pageBackgroundStyles: React.CSSProperties = {
  backgroundImage: `url(${require("../assets/login-background.gif")})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const profileContainerStyles: React.CSSProperties = {
  width: "450px",
  backgroundColor: "#fff",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  height: "550px",
  position: "relative",
};

const coverImageStyles: React.CSSProperties = {
  height: "150px",
  backgroundImage: `url(${require("../assets/Forest.gif")})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const profileContentStyles: React.CSSProperties = {
  padding: "20px",
  textAlign: "center",
  position: "relative",
};

const profileImageStyles: React.CSSProperties = {
  width: "110px",
  height: "110px",
  borderRadius: "50%",
  border: "1px solid #888",
  position: "absolute",
  top: "-50px",
  left: "50%",
  transform: "translateX(-50%)",
  objectFit: "cover",
  background: "#FFFFFF",
};

const nameStyles: React.CSSProperties = {
  marginTop: "60px",
  marginBottom: "5px",
};

const infoStyles: React.CSSProperties = {
  color: "#777",
  marginBottom: "20px",
  textAlign: "left",
  paddingLeft: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const textInfoStyles: React.CSSProperties = {
  marginTop: "15px",
  marginBottom: "15px",
};

export default Profile;
