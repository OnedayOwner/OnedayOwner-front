import React from 'react';
import MyHeader from './Header';
import FooterCustomer from './FooterCustomer'; 
import FooterOwner from './FooterOwner'; 

const Layout = ({ children, headText, footerType, showHeader = true }) => { 
  const renderFooter = () => {
    if (footerType === "customer") {
      return <FooterCustomer />;
    } else if (footerType === "owner") {
      return <FooterOwner />;
    }
    return null;
  };

  return (
    <>
      {showHeader && (
        <MyHeader 
          headText={headText}
          notice={<i className="fas fa-bell"></i>}
          Myinformation={<i className="fas fa-user"></i>}
        />
      )}
      <div className='content'>{children}</div>
      {renderFooter()}
    </>
  );
};

export default Layout;
