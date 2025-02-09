import React from "react";
import Navbar from "../../components/navBar/Navbar";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <>
    <Navbar/>
    <section className="hero d-flex align-items-center justify-content-center">
      <div className="text-center text-white">
        <h1 className="display-3 fw-bold">Sentex</h1>
        <p className="lead">Una experiencia única</p>
      </div>
    </section>
    </>
  );
};

export default Home;
