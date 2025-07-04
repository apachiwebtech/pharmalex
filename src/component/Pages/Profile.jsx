import React, { useEffect, useState } from 'react';
import back from '../images/arrow-left.svg';
import { Link, useNavigate } from 'react-router-dom';
import book1 from '../images/book1.jpg';


export default function Profile() {
  const navigate = useNavigate()
  const [value, setvalue] = useState({
    firstName: '',
    Lastname: '',
    email: '',
    userid: localStorage.getItem('user_id'),
  })

  useEffect(() => {
    setvalue({
      firstName: localStorage.getItem('firstName'),
      Lastname: localStorage.getItem('Lastname'),
      email: localStorage.getItem('email')
    })
  }, [])

  const handleChange = (e) => {
    const { name, value: inputValue } = e.target;
    setvalue(prv => ({
      ...prv,
      [name]: inputValue
    }));
  }

  const handleclick = () => {

    const confirm = window.confirm("Do you want to logout?")
    if (confirm) {
      localStorage.removeItem('user_id')
      localStorage.removeItem('user_loggedin')
      localStorage.removeItem('Lastname')
      localStorage.removeItem('email')
      localStorage.removeItem('firstName')

      navigate('/login')
    }

  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('firstName', value.firstName);
      formData.append('Lastname', value.Lastname);
      formData.append('email', value.email);
      formData.append('userid', localStorage.getItem('user_id'));

      const response = await fetch('https://susmitpublishers.com/weblogin/appuserupdate.php', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert('Profile updated successfully!');
        localStorage.setItem('firstName', value.firstName);
        localStorage.setItem('Lastname', value.Lastname);
        localStorage.setItem('email', value.email);
      } else {
        alert(data.message || 'Update failed.');
      }
    } catch (error) {
      alert('An error occurred while updating profile.');
    }
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
            <input onChange={handleChange} type="text" value={value.firstName} name='firstName' class="form-control" id="floatingInput" placeholder="First Name" />
            <label for="floatingInput">First Name</label>
          </div>
          <div class="form-floating mb-3">
            <input onChange={handleChange} type="text" value={value.Lastname} name='Lastname' class="form-control" id="floatingInput" placeholder="Last Name" />
            <label for="floatingInput">Last Name</label>
          </div>
          <div class="form-floating mb-3">
            <input onChange={handleChange} type="email" value={value.email} name='email' class="form-control" id="floatingInput" placeholder="name@example.com" />
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
