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
        email: values.email,
        password: hashedPassword
      }


      // Navigate('/');
      // localStorage.setItem("user_loggedin", true);
      // localStorage.setItem('user_id', 1);
      // localStorage.setItem('email', "satyam@gmail.com");
      // localStorage.setItem('firstName', "satyam");
      // localStorage.setItem('Lastname', "satkar");
      // Navigate('/');


      axios
        .post(`${BASE_URL}/applogin.php`, data)
        .then((res) => {
          console.log(res.data.status);

          // setValid(res.data)
          setTimeout(() => {

            setValid("")
          }, 2000);

          if (res.data.status === 'success') {
            Navigate('/');
            localStorage.setItem("user_loggedin", true);
            localStorage.setItem('user_id', res.data.data.id);
            localStorage.setItem('email', res.data.data.emailid);
            localStorage.setItem('firstName', res.data.data.firstname);
            localStorage.setItem('Lastname', res.data.data.lastname);
          } else {
            setValid("Invalid credentials");
          }



        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoad("")
        })
    }




  };




  const handleinput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };


  return (
    <div className="loginmain m-4">
      <form onSubmit={handleSubmit} method="POST" className="my-5">
        <h3 style={{ fontWeight: "700", textAlign: "center" }}>
          Welcome to Susmit Publishers
        </h3>
        <h4 style={{ fontWeight: "500", textAlign: "center", marginBottom: "24px" }}>
          Please log in to continue
        </h4>
        <div className="d-flex justify-content-center">
          <img style={{ width: "200px" }} src={Book} alt="Susmit Publishers Logo" />
        </div>
        <div className="my-3">
          <TextField
            type="email"
            sx={{ width: "100%" }}
            id="email-field"
            onChange={handleinput}
            name="email"
            label="Email Address"
            variant="filled"
            autoComplete="username"
          />
          {errors.email && <span className='text-danger'>{errors.email}</span>}
        </div>
        <div className="my-3">
          <TextField
            type="password"
            sx={{ width: "100%" }}
            id="password-field"
            onChange={handleinput}
            name="password"
            label="Password"
            variant="filled"
            autoComplete="current-password"
          />
          {errors.password && <span className='text-danger'>{errors.password}</span>}
        </div>
        <div className="my-3">
          <Button
            type="submit"
            sx={{ width: "100%", color: "#339966", borderColor: "#339966" }}
            variant="outlined"
            size="large"
          >
            Log In
          </Button>
          {valid && <span style={{ color: "red", display: "block", marginTop: "8px" }}>{valid}</span>}
          {load && <span style={{ color: "#339966", display: "block", marginTop: "8px" }}>{load}</span>}
        </div>
        <div hidden style={{ textAlign: "center", marginTop: "16px" }}>
          <span>New to the application? </span>
          <Link to="">Register here</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
