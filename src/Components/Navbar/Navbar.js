import { React, useState } from "react";
import classes from "./Navbar.module.css";
import { NavLink, Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {logout} from "../../redux/login/loginThunk";
const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isActive, setActive] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const handleToggle = () => {
    let wd = window.innerWidth;
    if (wd < 998) {
      setNavbarOpen(!navbarOpen);
    }
  };
  const dispatch=useDispatch();
  const Logout=()=>{
    dispatch(logout());
  }
  return (
    <>
      <div className={classes.Outer}>
        {/* <div className={classes.hamLogo} onClick={() => handleToggle()} ><img src="https://github.com/KSHITIJ-2022/media/blob/master/images/navbar/arrow.png?raw=true" alt="" className={`${classes.checker}`} /></div> */}
          <Link to="/">
        <div className={classes.Logo}>
          <img
            height="100%"
            src="https://github.com/KSHITIJ-2022/media/blob/master/images/ILU-light-new.png?raw=true"
            alt=""
          ></img></div></Link>
        <div div className={classes.Limks}>
          <div className={classes.IndLimk}>
            <Link to="/" onClick={() => handleToggle()}>
              HOME
            </Link>
          </div>
          <div className={classes.IndLimk}>
            <Link to="/rules" onClick={() => handleToggle()}>
              RULES
            </Link>
          </div>

{  isAuthenticated?        <div className={classes.IndLimk}>
            <Link to="/questions" onClick={() => handleToggle()}>
              QUESTIONS
            </Link>
          </div>:''}

          {!isAuthenticated ? (
            <>
              <div className={`${classes.IndLimk} ${classes.dec}`}>
                <Link to="/login" onClick={() => handleToggle()}>
                  LOGIN{" "}
                </Link>
              </div>
              <div className={`${classes.IndLimk} ${classes.dec}`}>
                <a href="https://ktj.in/#/signuppre" onClick={() => handleToggle()}>
                  {" "}
                  SIGN UP
                </a>
              </div>
            </>
          ) : (
            <div className={`${classes.IndLimk} ${classes.dec}`} style={{cursor:"pointer"}} onClick={Logout}>
                
                  LOGOUT{" "}
              </div>
          )}
        </div>
      </div>

      {/* MOBILE  */}

      {
        <>
          <div
            className={
              navbarOpen
                ? `${classes.Inner} ${classes.Closed}`
                : `${classes.Inner}`
            }
          >
            <div className={classes.hamLogo2} onClick={() => handleToggle()}>
              <img
                src="https://github.com/KSHITIJ-2022/media/blob/master/icons/ham.png?raw=true"
                alt=""
                className={`${classes.checker}`}
              />
            </div>

            <div className={`${classes.Logo2}`}>
              <img
                height="100%"
                src="https://github.com/KSHITIJ-2022/media/blob/master/images/ILU-light-new.png?raw=true"
              ></img>
            </div>
            <div div className={classes.Limks2}>
              <div className={classes.IndLimk2}>
                <Link to="/" onClick={() => handleToggle()}>
                  Home
                </Link>
              </div>
              <div className={classes.IndLimk2}>
                <Link to="/rules" onClick={() => handleToggle()}>
                  RULES
                </Link>
              </div>
              {isAuthenticated ? (
                <div className={classes.IndLimk2}>
                  <Link to="/questions" onClick={() => handleToggle()}>
                    QUESTIONS
                  </Link>
                </div>
              ) : (
                ""
              )}

              {!isAuthenticated ? (
                <>
                  {" "}
                  <div className={`${classes.IndLimk2} ${classes.dec2}`}>
                    <Link to="/login" onClick={() => handleToggle()}>
                      LOGIN{" "}
                    </Link>
                  </div>
                  <div className={`${classes.IndLimk2} ${classes.dec2}`}>
                    <Link to="/login" onClick={() => handleToggle()}>
                      {" "}
                      SIGN UP
                    </Link>
                  </div>
                </>
              ) : (
                <div className={`${classes.IndLimk2} ${classes.dec2}`} style={{cursor:"pointer"}} onClick={Logout}>
                  {/* <Link to="/login" onClick={() => handleToggle()}> */}{" "}
                  LOGOUT
                  {/* </Link> */}
                </div>
              )}
            </div>
          </div>
          <div
            className={
              navbarOpen
                ? `${classes.hamLogo3}`
                : `${classes.hamLogo3} ${classes.Closed}`
            }
            onClick={() => handleToggle()}
          >
            <img
              onClick={() => handleToggle()}
              src="https://github.com/KSHITIJ-2022/media/blob/master/icons/ham.png?raw=true"
              alt=""
              className={`${classes.checker}`}
            />
          </div>
        </>
      }
    </>
  );
};

export default Navbar;
