import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MyHeader from './components/MyHeader';
import '@fortawesome/fontawesome-free/js/all.js';
import Login from "./pages/Login/Login";
import Ownerhome from './pages/창업희망자/Ownerhome';
import Customerhome from './pages/일반 손님/Customerhome';
import Registration from './pages/창업희망자/Registration';
import Feedback from './pages/창업희망자/Feedback';
import ReservationStatus from './pages/창업희망자/ReservationStatus';
import Signup from './pages/Login/Signup';
import SMSVerification from './pages/Login/SMSVerification';

const App = () => {
  return (
      <BrowserRouter>
        <div className='App'>
          <MyHeader 
            headText={"오늘만 사장"}
            notice={<i className="fas fa-bell"></i>}
            Myinformation={<i className="fas fa-user"></i>}
          />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/sms-verification" element={<SMSVerification />} />
            <Route path="/Ownerhome" element={<Ownerhome />} />
            <Route path="/Customerhome" element={<Customerhome />} />
            <Route path="/Registration" element={<Registration />} />
            <Route path="/Feedback" element={<Feedback />} />
            <Route path="/ReservationStatus" element={<ReservationStatus />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
