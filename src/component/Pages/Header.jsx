import React from 'react'
import logo from '../images/logo.png'


const Header = () => {
  return (
    <div className="menu_box">
      <img src={logo} alt="" className='logo' />
      {/* <i class="bi bi-list menu_icon1"></i> */}
    </div>
  )
}

export default Header
