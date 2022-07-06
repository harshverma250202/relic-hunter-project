import { React, useState } from "react";
import classes from "./LoginPage.module.css";
// import API from "../../api";
import { login } from "../../redux/login/loginThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { googleLogin } from "../../redux/login/loginThunk";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import {message} from 'antd'

function LoginPage() {
  const [UserName, setUserName] = useState("");
  const [UserPass, setUserPass] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate.push("/questions");
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    dispatch(login({ email: UserName, password: UserPass }));
  };

  // Google login

  const googleSuccess = async (res) => {
    if (res) {
      dispatch(googleLogin(res));
    }
  };

  const googleFailure = (err) => {
    // set Errro msg
    console.log("google Signin was unsuccessful");
    console.log(err);
    message.error("Google Signin was unsuccessful");
  };

  return (
    <div className={classes.CoverArea}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.Rcard}>
        <div className={classes.header3}>WELCOME BACK</div>
        <div className={classes.Ans}>
          <input
            type="text"
            placeholder="Email"
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className={classes.Ans}>
          <input
            type="password"
            placeholder="Password"
            value={UserPass}
            onChange={(e) => setUserPass(e.target.value)}
            required
          />
        </div>
        <div className={classes.note_log}>*NOTE:<br/>1. Credentials will be same as that of ktj.in<br/>2. Yet to register? Register <a href="https://ktj.in/#/event/RelicHunter" target="_blank">here</a></div>
        <div className={classes.lowerArea}>
          <div className={classes.lowInp}>
            <button onClick={handleLogin}>Login</button>
          </div>
          <div className={classes.lowInp}>
            <button><a className={classes.lin} href="https://ktj.in/#/resetpassword">Forgot Password</a></button>
          </div>
          <div className={classes.lowInp}>
            <GoogleLogin
              clientId="641600505779-28br6dkj36bocf5095uo2nd4nmoob6te.apps.googleusercontent.com"
              render={(renderProps) => (
                <button onClick={renderProps.onClick}>Login with Google</button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
