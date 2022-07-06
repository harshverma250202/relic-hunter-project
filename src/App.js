import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Rules from './Components/Rules/Rules'
import Questions from './Components/Questions/Questions'
import LandingPage from './Components/LandingPage/LandingPage'
import LoginPage from './Components/LoginPage/LoginPage'
import Navbar from './Components/Navbar/Navbar'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {checkUserAuth} from './redux/login/loginThunk'
import  { Navigate } from 'react-router-dom'
import 'antd/dist/antd.css'; 
function App() {

  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(checkUserAuth())

  },[])
  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path = "/" element={<LandingPage/>} />
        <Route exact path = '/rules' element={<Rules/>} />
       <Route exact path = "/questions" element={ isAuthenticated?<Questions/>:<Navigate to="/login" />} /> 
        <Route exact path = "/login" element={!isAuthenticated?<LoginPage/>:<Navigate to="/questions" />} />
      </Routes>
    </Router>
  );
}

export default App;
