import React from 'react'
import NavBar from './nav-bar';
const Layout = ( {children}) => {
return (
  <>
  <div className="w-full h-screen flex flex-col">
  <div>
    <NavBar />
  </div>
  
  <div className="flex">


    {/* Main Content */}
    <div className="w-full h-screen  relative top-20">
      {children}
    </div>
  </div>
</div>

  </>
)

};

export default Layout;
