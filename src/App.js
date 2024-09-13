import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import '@fortawesome/fontawesome-free/js/all.js';
import Login from "./pages/login/Login";
import Ownerhome from './pages/owner/Ownerhome';
import Customerhome from './pages/customer/Customerhome';
import Registration from './pages/owner/Registration';
import Feedback from './pages/owner/Feedback';
import ReservationStatus from './pages/owner/ReservationStatus';
import Signup from './pages/login/Signup';
import SMSVerification from './pages/login/SMSVerification';
import Layout from './components/Layout';
import Onboarding from './pages/login/Onboarding';

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
