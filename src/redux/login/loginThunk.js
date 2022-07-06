import * as auth from "./loginActionCreator";
// import * as error from '../../error/errorActionCreator'
import API from "../../api";
import { message } from 'antd'

//ALL the Asyncronous logic for login will be here

export const checkUserAuth = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    dispatch(auth.userCheckRequest());

    API.post("/login_check", { token })
      .then((res) => {
        dispatch(auth.userCheckSuccess(res.data.user));
        console.log(res.data, "success");

      })
      .catch((err) => {
        dispatch(auth.userCheckFailure());
      });
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    dispatch(auth.logoutRequest());
    message.success("Logged out successfully");

    dispatch(auth.logoutSuccess());
  };
};

export const login = (payload) => {

  const { email, password } = payload;

  const body = JSON.stringify({
    email: email,
    password: password
  })

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return (dispatch) => {

    if (password === null || email === null || password === "" || email === "") {

      let string = ""

      if ((password === null || password === "") && (email === null || email === "")) {
        string = "Both Password and Email"
      }
      else {
        string = email ? "Password" : "Email"
      }
      dispatch(auth.loginFailure());
    }
    else {

      dispatch(auth.loginRequest());

      API.post('/login/', body, config)
        .then((response) => {
          // console.log(response.data);
          if (response.data.not_registered) {
            dispatch(auth.loginFailure());
            message.error("Register for the event first. Redirecting to registration page")
            setTimeout(() => {
              window.open("https://ktj.in/#/event/RelicHunter", "_blank");
            }, 4000)
          }
          else {
            dispatch(auth.loginSuccess(response.data));
            message.success("Logged in successfully");
          }
        })
        .catch((err) => {
          console.log(err)
          dispatch(auth.loginFailure());
          message.error("Invalid Credentials");
        })
    }
  }

}


export const googleLogin = (userData, history) => (dispatch) => {
  dispatch(auth.loginRequest());
  API.post("/googleLogin", { token: userData.tokenId })
    .then((response) => {
      if (response.data.not_registered) {
        dispatch(auth.loginFailure());
        message.error("Register for the event first. Redirecting to Registration page")
        setTimeout(() => {
          window.open("https://ktj.in/#/event/RelicHunter", "_blank");
        }, 4000)
      }
      else {
        dispatch(auth.loginSuccess(response.data));
        message.success("Logged in successfully");
      }


    })
    .catch((err) => {
      console.log(err)
      dispatch(auth.loginFailure());
      message.error("Please Signup With this Email");
    });
};

