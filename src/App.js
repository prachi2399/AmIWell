import React, { useState, useEffect } from "react";
import Chatbot from "react-chatbot-kit";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ActionProvider from "./components/modules/chatbot/ActionProvider";
import config from "./components/modules/chatbot/Config";
import MessageParser from "./components/modules/chatbot/MessageParser";
import ChatImage from "./assets/chatbot.png";
import "./App.css";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Footer from "./components/layout/Footer";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import About from "./components/pages/About";
import { useAuth } from "./context/AuthContext";
import DoctorModal from "./components/modules/DoctorModal";

function App() {
  const [isVisible, setIsVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [profile, setProfile] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const { currentUser } = useAuth();
  const [symptoms, setSymptoms] = useState([]);
  // get symptoms list
  const getSymptoms = async () => {
    try {
      const response = await fetch("http://localhost:4001/api/symptoms");
      const result = await response.json();
      setSymptoms(result?.symptoms);
    } catch (error) {
      console.log(error, "eeerrr");
    }
  };

  const getDoctors = async () => {
    try {
      const response = await fetch("http://localhost:4001/api/get-doctors", {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setDoctors(result?.doctors);
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const getDoctor = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/get-doctor/${email}`
      );
      const result = await response.json();
      if (result?.doctor === null) {
        setModalVisible(true);
        setIsVisible(false);
      } else {
        setProfile(result?.doctor);
      }
    } catch (error) {
      console.log(error, "hey");
    }
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    getSymptoms();
    getDoctors();
    const login_by = localStorage.getItem("login_by");
    if (currentUser && login_by === "doctor") {
      getDoctor(currentUser?.email);
    }
  }, [currentUser]);

  return (
    <React.Fragment>
      <Router>
        <Header setModalVisible={setModalVisible} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                symptoms={symptoms}
                doctors={doctors}
                setDoctors={setDoctors}
              />
            }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/login"
            element={currentUser ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
        <Routes>
          <Route exact path="/about" element={<About />} />
        </Routes>
        <Routes>
          <Route exact path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="btn chatbot-toggle"
        style={{
          width: "55px",
          height: "55px",
          padding: "0",
          boxShadow: "0 0 0 0.25rem rgb(13 110 253 / 25%)",
        }}
      >
        <img style={{ width: "55px" }} src={ChatImage} alt="chatbot" />
      </button>
      {isVisible && (
        <div className="project-chatbot">
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
          />
        </div>
      )}
      <DoctorModal
        modalVisible={modalVisible}
        handleCancel={handleCancel}
        handleOk={handleOk}
        symptoms={symptoms}
        profile={profile}
        getDoctors={getDoctors}
      />
    </React.Fragment>
  );
}

export default App;
