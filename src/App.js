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
import CustomerProfile from './pages/customer/CustomerProfile';
import CustomerPopup from './pages/customer/CustomerPopup';
import CustomerMyReservation from './pages/customer/CustomerMyReservation';
import CustomerReservation from './pages/customer/CustomerReservation';
import CustomerReservationMenu from './pages/customer/CustomerReservationMenu';
import CustomerReservationDetail from './pages/customer/CustomerReservationDetail';
import CustomerFeedback from './pages/customer/CustomerFeedback';
import CustomerMyFeedback from './pages/customer/CustomerMyFeedback';
import CustomerFeedbackDetail from './pages/customer/CustomerFeedbackDetail';

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
            <Route path="/owner/feedback/:popupId" element={<Layout showHeader={false} footerType="owner"><OwnerFeedback /></Layout>} />
            <Route path="/owner/reservationstatus/:popupId" element={<Layout showHeader={false} footerType="owner"><OwnerReservationStatus /></Layout>} />
            <Route path="/owner/profile" element={<Layout showHeader={false} footerType="owner"><OwnerProfile /></Layout>} />
            
            <Route path="/customer/home" element={<Layout showHeader={false} footerType="customer"><Customerhome /></Layout>} />
            <Route path="/customer/myfeedback" element={<Layout showHeader={false} footerType="customer"><CustomerMyFeedback /></Layout>} />
            <Route path="/customer/myreservation" element={<Layout showHeader={false} footerType="customer"><CustomerMyReservation /></Layout>} />
            <Route path="/customer/profile" element={<Layout showHeader={false} footerType="customer"><CustomerProfile /></Layout>} />
            <Route path="/customer/popup/:popupId" element={<Layout headText="팝업 상세" footerType="customer"><CustomerPopup /></Layout>} />
            <Route path="/customer/reservation/:popupId" element={<Layout headText="예약" footerType="customer"><CustomerReservation /></Layout>} />
            <Route path="/customer/reservation/menu/:popupId" element={<Layout headText="예약" footerType="customer"><CustomerReservationMenu /></Layout>} />
            <Route path="/customer/myreservation/:reservationId" element={<Layout headText="예약 내역" footerType="customer"><CustomerReservationDetail /></Layout>} />
            <Route path="/customer/feedback/:reservationId" element={<Layout headText="피드백" footerType="customer"><CustomerFeedback /></Layout>} />
            <Route path="/customer/myfeedback/:feedbackId" element={<Layout headText="피드백 내역" footerType="customer"><CustomerFeedbackDetail /></Layout>} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
