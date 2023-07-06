import React, { useContext, useState } from "react";
import axios from "axios";
import { TextField, Button, Typography } from "@mui/material";
import validator from "validator";
import { Acontext } from "../App";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const { setisLogin, setuser } = useContext(Acontext);
  const data = { email: "", password: "" };
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleValue = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm();
  
    if (Object.keys(validationErrors).length === 0) {
      axios
        .get("http://localhost:4000/Userdata")
        .then((res) => {
          if (res) {
            const matchingUser = res.data.find((user) => user.email === formData.email);
            if (matchingUser) {
              if (matchingUser.password === formData.password) {
                setuser(matchingUser);
                alert("Login Successful");
                setFormData(data);
                setisLogin(true);
                navigate("/");
              } else {
                alert("Invalid password. Please try again.");
              }
            } else {
              alert("Invalid email. Please try again.");
            }
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Server Error. Please Try Again");
          setFormData(data);
        });
    } else {
      setErrors(validationErrors);
    }
  };
  
  

  const validateForm = () => {
    const errors = {};

    if (validator.isEmpty(formData.email)) {
      errors.email = "Email is required";
    } else if (!validator.isEmail(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (validator.isEmpty(formData.password)) {
      errors.password = "Password is required";
    }

    return errors;
  };

  return (
    <div className="container">
      <div className="image-container">
        <img
          src="https://source.unsplash.com/960x520/?coffee,coffee"
          alt="Login"
          className="login-image"
        />
      </div>
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <Typography variant="body1" className="heading-l">
            Login
          </Typography>
          <TextField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter Your Email"
            onChange={handleValue}
            value={formData.email}
            margin="normal"
            variant="outlined"
            className="login-field"
            error={errors.email}
            helperText={errors.email}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter Your Password"
            onChange={handleValue}
            value={formData.password}
            margin="normal"
            variant="outlined"
            className="login-field"
            error={errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="login-button"
            disableElevation
          >
            Login
          </Button>
          <Typography variant="body1" className="register-link">
            Don't have an account?{" "}
            <Link to="/signin" color="inherit">
              Register
            </Link>
          </Typography>
        </form>
      </div>
    </div>
  );
};

export default Login;


// this code for real api
// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { TextField, Button, Typography} from "@mui/material";
// import validator from "validator";
// import { Acontext } from "../App";
// import {useNavigate} from "react-router-dom";
// import { Link } from "react-router-dom";


// const Login = () => {
//   const{setisLogin,setuser}=useContext(Acontext);
//   const data = { email: "", password: "" };
//   const [formData, setFormData] = useState(data);
//   const [errors, setErrors] = useState({});
//   const nevigate=useNavigate();

//   const handleValue = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const validationErrors = validateForm();

//     if (Object.keys(validationErrors).length === 0) {
//       axios
//         .post("http://192.168.0.173:4000/login", formData)
//         .then((res) => {
//           setuser(res.data.athantication);
//           alert("Login Successfully");
//           setFormData(data);
//           setisLogin(true);
//           nevigate('/')
//         })
//         .catch((error) => {
//           console.log(error);
//           alert("Server Error. Please Try Again");
//           setFormData(data);
//         });
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   const validateForm = () => {
//     const errors = {};

//     if (validator.isEmpty(formData.email)) {
//       errors.email = "Email is required";
//     } else if (!validator.isEmail(formData.email)) {
//       errors.email = "Invalid email format";
//     }

//     if (validator.isEmpty(formData.password)) {
//       errors.password = "Password is required";
//     }

//     return errors;
//   };

//   return (
//     <div className="container">
//       <div className="image-container">
//         <img src="https://source.unsplash.com/960x520/?coffee,coffee" alt="Login" className="login-image" />
//       </div>
//       <div className="login-form-container">
//         <form onSubmit={handleSubmit} className="login-form">
//         <Typography variant="body1" className="heading-l">
//             Login
//           </Typography>
//           <TextField
//             name="email"
//             label="Email"
//             type="email"
//             placeholder="Enter Your Email"
//             onChange={handleValue}
//             value={formData.email}
//             margin="normal"
//             variant="outlined"
//             className="login-field"
//             error={errors.email}
//             helperText={errors.email}
//           />
//           <TextField
//             name="password"
//             label="Password"
//             type="password"
//             placeholder="Enter Your Password"
//             onChange={handleValue}
//             value={formData.password}
//             margin="normal"
//             variant="outlined"
//             className="login-field"
//             error={errors.password}
//             helperText={errors.password}
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             className="login-button"
//             disableElevation
//           >
//             Login
//           </Button>
//           <Typography variant="body1" className="register-link">
//             Don't have an account?{" "}
//             <Link to="/signin" color="inherit">
//               Register
//             </Link>
//           </Typography>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
