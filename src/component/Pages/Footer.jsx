import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='footer'>
      <Link to="/">
        <div className="footer_box">
          <i class="bi bi-house-fill"></i>
          <p>HOME</p>
        </div>
      </Link>
      {/* <Link to="/chapter">
        <div className="footer_box">
          <i class="bi bi-journal-bookmark"></i>
          <p>last seen</p>
        </div>
      </Link>

      <Link to="/">
        <div className="footer_box">
          <i class="bi bi-search"></i>
          <p>search</p>
        </div>
      </Link> */}

      <Link to="/profile">
        <div className="footer_box">
          <i class="bi bi-person-circle"></i>
          <p>PROFILE</p>
        </div>
      </Link>
    </div>
  )
}

export default Footer


