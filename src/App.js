
import './App.css';
import {Routes,Route, Navigate, Outlet} from 'react-router-dom'
import SignUp from './components/account/SignUp';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import { useEffect, useState } from 'react';
import WriteBlog from './components/writeBlog/WriteBlog';

function App() {
  const [isUserAuth , setUserAuth] = useState(false);
  useEffect(()=>{
      if(sessionStorage.getItem("user") !== null){
        setUserAuth(true);
      }
  },[])
  return (
    <div>
      {isUserAuth ? <Navbar /> : ""}
    <div className="App" style={{marginTop:"60px",backgroundColor:"030637"}}>
      <Routes>
        <Route path="/" element={<SignUp setUserAuth={setUserAuth} />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/write_blog" element={<WriteBlog/>} />
      </Routes>
      </div>
    </div>
  );
}

export default App;

