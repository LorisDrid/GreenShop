import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TopNavHeader, { NavOption } from "../components/TopNavBar";
import "../styles/Home.scss";

const Home: React.FC = () => {
  return (
    <div className="home">
      <TopNavHeader selected={NavOption.Shop} />
      <Header />
      <main className="mainContent">
        <section className="heroSection">
          <h1>Welcome to MyApp</h1>
          <p>Your one-stop shop for amazing products.</p>
          <button>Sign Up</button>
          <button>Learn More</button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
