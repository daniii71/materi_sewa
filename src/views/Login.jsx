import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [loginError, setLoginError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const data = {
      username: username,
      password: password,
      role: role, // Menggunakan nilai role di sini
    };
  
    try {
      const response = await axios.post(`http://localhost:8080/login`, data);
  
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Login Sebagai Admin",
          showConfirmButton: false,
          timer: 1500,
        });
  
        setTimeout(() => {
          window.location.href = "/Sidebar";
        }, 1500);
  
        localStorage.setItem("id", response.data.userData.id);
        localStorage.setItem("role", response.data.userData.role);
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      setLoginError("Username / Password Salah");
      console.error(error);
    }
  };
  

  return (
    <div id="main-wrapper" className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card-group mb-5">
            <div className="card p-2">
              <div className="card-body">
                <h1>Login</h1>
                <br />
                {/* <p className="text-muted">Sign In to your account</p> */}
                <form onSubmit={handleLogin}>
                  <div className="input-group mb-3">
                    <span className="input-group-addon">
                      <i className="fa fa-user"></i>
                    </span>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-4">
                    <span className="input-group-addon">
                      <i className="fa fa-lock"></i>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="form-control"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                      />
                    </button>
                  </div>
                  {loginError && (
                    <div className="alert alert-danger">{loginError}</div>
                  )}
                  <div className="row">
                    <div className="col-6">
                      <button
                        type="submit"
                        className="btn btn-outline-primary px-4"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="card bg-secondary py-5 d-md-down-none" style={{ width: '100%' }}> 
              <div className="card-body text-center"> 
                <div className="mt-3 text-left"> 
                  <h2 style={{ color: 'white' }}>Sign up</h2> 
                  <p className="mt-3" style={{ color: 'white' }}>Masuk dengan mengisi username dan password</p> 
                  <Link 
                  to="/Register" 
                  className="btn btn-outline-warning   px-4 mt-3 text-uppercase" 
                >
                  Register
                </Link>

                </div> 
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
