import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MyHeader from './components/Header';
import '@fortawesome/fontawesome-free/js/all.js';
import Login from "./pages/Login/Login";
import Ownerhome from './pages/창업희망자/Ownerhome';
import Customerhome from './pages/일반 손님/Customerhome';
import Registration from './pages/창업희망자/Registration';
import Feedback from './pages/창업희망자/Feedback';
import ReservationStatus from './pages/창업희망자/ReservationStatus';
import Signup from './pages/Login/Signup';
import SMSVerification from './pages/Login/SMSVerification';
import Layout from './components/Layout';
import Onboarding from './pages/Login/Onboarding';

const App = () => {
  return (
      <BrowserRouter>
        <div className='container'>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/sms-verification" element={<SMSVerification />} />
            <Route path="/ownerhome" element={<Layout><Ownerhome /></Layout>} />
            <Route path="/customerhome" element={<Layout><Customerhome /></Layout>} />
            <Route path="/registration" element={<Layout><Registration /></Layout>} />
            <Route path="/feedback" element={<Layout><Feedback /></Layout>} />
            <Route path="/reservationstatus" element={<Layout><ReservationStatus /></Layout>} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
