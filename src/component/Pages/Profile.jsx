import React from 'react';
import back from '../images/arrow-left.svg';
import { Link, useNavigate } from 'react-router-dom';
import book1 from '../images/book1.jpg';


export default function Profile() {
const navigate = useNavigate()
  const handleclick = () => {

    const confirm = window.confirm("Do you want to logout?")
    if(confirm){
      localStorage.removeItem('user_id')
      localStorage.removeItem('user_loggedin')
      localStorage.removeItem('Lastname')
      localStorage.removeItem('email')
      localStorage.removeItem('firstName')
  
      navigate('/login')
    }

  }

   const handlesubmit = () =>{
    alert("work in progress")
   }
 
  return (
    <div>
      <div className='d-flex align-items-center mt-2'>
        <Link to="/" className='mx-2'>  <img src={back} alt="" /></Link>

      </div>

      <div class="profile-form">
        <form>
          <div class="profile-image">
            <img src={book1} alt="Profile Image" />
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="First Name" />
            <label for="floatingInput">First Name</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="Last Name" />
            <label for="floatingInput">Last Name</label>
          </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
            <label for="floatingInput">Email address</label>
          </div>
          <div>
          <button type="button" class="login-btn" onClick={handlesubmit}>Submit <i class="bi bi-box-arrow-right"></i></button>
          </div>
        </form>
      </div>
      <button type="button" class="login-btn logout-btn" onClick={handleclick}>Logout <i class="bi bi-box-arrow-right"></i></button>

    </div>
  )
}



