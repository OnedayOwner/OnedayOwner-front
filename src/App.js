import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import '@fortawesome/fontawesome-free/js/all.js';
import Login from "./pages/login/Login";
import Ownerhome from './pages/owner/Ownerhome';
import Customerhome from './pages/customer/Customerhome';
import OwnerRegistration from './pages/owner/OwnerRegistration';
import OwnerFeedback from './pages/owner/OwnerFeedback';
import OwnerReservationStatus from './pages/owner/OwnerReservationStatus';
import Signup from './pages/login/Signup';
import SMSVerification from './pages/login/SMSVerification';
import Layout from './components/Layout';
import Onboarding from './pages/login/Onboarding';
import OwnerProfile from './pages/owner/OwnerProfile';
import CustomerSearch from './pages/customer/CustomerSearch';
import CustomerReservation from './pages/customer/CustomerReservation';
import CustomerProfile from './pages/customer/CustomerProfile';

const App = () => {
  return (
      <BrowserRouter>
        <div className='container'>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/sms-verification" element={<SMSVerification />} />
            
            <Route path="/owner/home" element={<Layout showHeader={false} footerType="owner"><Ownerhome /></Layout>} />
            <Route path="/owner/registration" element={<Layout headText="팝업 등록" footerType="owner"><OwnerRegistration /></Layout>} />
            <Route path="/owner/feedback" element={<Layout showHeader={false} footerType="owner"><OwnerFeedback /></Layout>} />
            <Route path="/owner/reservationstatus" element={<Layout showHeader={false} footerType="owner"><OwnerReservationStatus /></Layout>} />
            <Route path="/owner/profile" element={<Layout showHeader={false} footerType="owner"><OwnerProfile /></Layout>} />
            
            <Route path="/customer/home" element={<Layout showHeader={false} footerType="customer"><Customerhome /></Layout>} />
            <Route path="/customer/search" element={<Layout showHeader={false} footerType="customer"><CustomerSearch /></Layout>} />
            <Route path="/customer/reservation" element={<Layout showHeader={false} footerType="customer"><CustomerReservation /></Layout>} />
            <Route path="/customer/profile" element={<Layout showHeader={false} footerType="customer"><CustomerProfile /></Layout>} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
