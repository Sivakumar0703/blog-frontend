import React, { useState } from "react";
import { TextField, Box, Button, Typography, styled } from "@mui/material";
import "./account.css";
import * as yup from 'yup'; 
import { useFormik } from 'formik';
import axios from "axios";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoo.png";



const SignUp = () => {

    const [account, toggleAccount] = useState("login");
    const [loginData , setLoginData] = useState({email:"",password:""});
    const navigate = useNavigate();
    const url = "http://localhost:5000/api";
    

    // yup
    const registerSchemaValidation = yup.object({
        userName: yup.string().min(3, 'name should have minimum 3 character').required("Enter Your Name"),
        email: yup.string().email().required("Enter Email"),
        password: yup.string().min(8, 'enter minimum 8 character').required('Enter Password'),   
    })

    // formik function
     const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
      initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchemaValidation,
    onSubmit: (newuser,{resetForm}) => {
        console.log(newuser)
        register(newuser)
        resetForm()
    }
  })

  function handleInput(e){
    setLoginData((loginData) => ({...loginData , [e.target.name]:e.target.value}));
  }

  async function register(user){
    try {
        const result = await axios.post(`${url}/user/register_user`, user);
    console.log(result.data.message);
    toast(result.data.message);
    toggleSignup();
    } catch (error) {
        toast.error("Server Busy");
    }
  }

async function login(loginData){
   try {
    if(loginData.email.length === 0 || loginData.password.length === 0){
        return toast.warn("Please Ensure Your Credentials")
    }
    const result = await axios.post(`${url}/user/login` , loginData);
    toast(result.data.message);
    sessionStorage.setItem("user",JSON.stringify(result.data.user));
    navigate('/home');
   } catch (error) {
    toast.error(error.response?.data?.message ? error.response.data.message : "Server Busy");
   }
}


  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  const Image = styled("img")({
    width: 100,
    display: "flex",
    margin: "auto",
    padding: "50px 0 0",
  });

  const LoginButton = styled(Button)`
    text-transform: none;
    background: #fb641b;
    color: #fff;
    height: 48px;
    border-radius: 2px;
    margin-top: 20px;
    margin-bottom: 20px;
  `;

  const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
  `;

  return (
    <div id="account-page">
      <div style={{ width: "400px", margin: "auto", boxShadow:"5px 2px 5px 2px rgb(0 0 0/ 0.6)" }}>
      <Box style={{ backgroundColor: "#2C3531" }}>
        <Image src={logo} alt="blog" />
        {account === "login" ? (
          <div className="wrapper">
            <TextField 
            className="login-field"
            variant="standard" 
            label="Enter Email"
            name="email"
            autoComplete="off"
            onChange={(e)=>handleInput(e)}
            />

            <TextField
              variant="standard"
              label="Enter Password"
              type="password"
              className="password-field login-field"
              autoComplete="off"
              name="password"
              onChange={(e)=>handleInput(e)}
            />

            <LoginButton variant="contained" onClick={()=>login(loginData)}> Login </LoginButton>
            <Text style={{ textAlign: "center" }}> OR </Text>
            <Button className="signup-btn"
              onClick={() => toggleSignup()}
              style={{ marginBottom: 50 , marginTop:25}}
            >
              Create an account
            </Button>
          </div>
        ) : (
          <div className="wrapper">
            <TextField
              id="outlined-basic"
              label="User Name"
              variant="standard"
              name="userName"
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
              margin="normal"
              autoComplete="off"
            />
             {touched.userName && errors.userName ? <p style={{ color: "red" }}>{errors.userName}</p> : <p></p>}


            <TextField
              id="outlined-basic"
              label="Email"
              variant="standard"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              margin="normal"
              autoComplete="off"
            />
          {touched.email && errors.email ? <p style={{ color: "red" }}>{errors.email}</p> : ""}


            <TextField
              id="outlined-basic"
              label="Password"
              variant="standard"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              margin="normal"
              className="password-field"
              autoComplete="off"
            />
            {touched.password && errors.password ? <p style={{ color: "red" }}>{errors.password}</p> : ""}

            <Button className="signup-btn" variant="contained" onClick={handleSubmit}> Signup </Button>
            <Text style={{ textAlign: "center" }}> OR </Text>
            <LoginButton variant="contained" onClick={() => toggleSignup()}>
              Already have an account
            </LoginButton>
          </div>
        )}
      </Box>
    </div>
    </div>
  );
};

export default SignUp;
