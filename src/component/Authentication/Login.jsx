import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Book from '../images/booknew.png'
import md5 from 'js-md5';
import { BASE_URL } from '../utils/BaseUrl';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const [errors, setErrors] = useState({})
  const [valid, setValid] = useState([]);
  const [load, setLoad] = useState("")

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const Navigate = useNavigate();


  const validateForm = () => {
    let isValid = true;
    const newErrors = {};


    if (!values.email) {
      isValid = false;
      newErrors.email = "Email is required"
    }

    if (!values.password) {
      isValid = false;
      newErrors.password = "Password is required"
    }


    setErrors(newErrors);


    return isValid;


  }

  const handleSubmit = (event) => {
    event.preventDefault();

    
    if (validateForm()) {
      
      setLoad("Please Wait...")
      // const mail = values.email;
      const pass = values.password;
      
      const hashedPassword = md5(pass);
      console.log(hashedPassword)
      
      
      const data = {
        email : values.email,
        password : hashedPassword
      }
      

        Navigate('/');
        localStorage.setItem("user_loggedin", true);
        localStorage.setItem('user_id', 1);
        localStorage.setItem('email', "satyam@gmail.com");
        localStorage.setItem('firstName', "satyam");
        localStorage.setItem('Lastname', "satkar");
        Navigate('/');


      // axios
      //   .post(`${BASE_URL}/login`, data)
      //   .then((res) => {

      //     setValid(res.data)
      //     setTimeout(() => {

      //       setValid("")
      //     }, 2000);

      //     if (res.data.id) {
      //       Navigate('/');
      //       localStorage.setItem("user_loggedin", true);
      //       localStorage.setItem('user_id', res.data.id);
      //       localStorage.setItem('email', res.data.email);
      //       localStorage.setItem('firstName', res.data.firstName);
      //       localStorage.setItem('Lastname', res.data.lastName);


      //     } 


      //   })
      //   .catch((err) => console.log(err))
      //   .finally(() => {
      //     setLoad("")
      //   })
    }




  };




  const handleinput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };


    return (
        <div className="loginmain m-4">
            <form onSubmit={handleSubmit} method="POST" className="my-5"> 
                <h3 style={{fontWeight : "700"}}>
                    Login
                </h3>
                <div className = "d-flex justify-content-center">
                    <img style={{width : "250px"}} src={Book} alt="" />
                </div>
                <div className="my-3">
                    <TextField type="email" sx={{ width: "100%" }} id="filled-basic" onChange={handleinput} name="email" label="Email" variant="filled" />
                    {errors.email && <span  className='text-danger'>{errors.email}</span>}
                </div>
                <div className="my-3">
                    <TextField type="password" sx={{ width: "100%" }} id="filled-basic" onChange={handleinput} name="password" label="Password" variant="filled" />
                    {errors.password && <span  className='text-danger'>{errors.password}</span>}
                </div>
                <div className="my-3">
                    <Button type="submit" sx={{ width: "100%", color: "#339966 ", borderColor: "#339966 " }} variant="outlined" size="large">Login</Button>
                    <span style={{ color: "red" }}>{valid}</span>
                    <span style={{ color: "red" }}>{load}</span>
                </div>

                <div>
                    <span>New to app?</span><Link to="">Click here</Link>
                </div>
            </form>

        </div>
    )
}

export default Login