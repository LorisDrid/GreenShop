import React, { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import TopNavHeader, { NavOption } from "../components/header/TopNavBar";
import defaultProfileImage from "../assets/default-profile.png";
import "./Profile.scss";

const Profile: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    // Implémentez la logique de déconnexion ici
    alert("Déconnexion réussie");
  };

  return (
    <>
      <TopNavHeader selected={NavOption.Shop} />
      <Header />
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
          <h2 style={nameStyles}>Gordon Ramsay</h2>
          <div style={infoStyles}>
            <p style={textInfoStyles}>
              <strong>E-mail:</strong> gordon.ramsay@example.com
            </p>
            <p style={textInfoStyles}>
              <strong>Phone:</strong> +123456789
            </p>
            <p style={textInfoStyles}>
              <strong>Points:</strong> 2400
            </p>
            <p style={textInfoStyles}>
              <strong style={{ marginRight: "8px" }}>Orders:</strong>{" "}
              <a href="/orders" className={"orders"}>
                click to see your orders
              </a>
            </p>
          </div>
          <img
            src={require("../assets/logout.png")}
            alt="Logout"
            className={"logoutButton"}
            onClick={handleLogout}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

// Styles
const profileContainerStyles: React.CSSProperties = {
  maxWidth: "400px",
  margin: "100px auto",
  backgroundColor: "#fff",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  height: "500px",
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
};

const textInfoStyles: React.CSSProperties = {
  marginTop: "15px",
  marginBottom: "15px",
};

export default Profile;
