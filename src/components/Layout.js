import React from 'react';
import MyHeader from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <MyHeader 
        headText={"오늘만 사장"}
        notice={<i className="fas fa-bell"></i>}
        Myinformation={<i className="fas fa-user"></i>}
      />
      <div>{children}</div>
    </>
  );
};

export default Layout;
