import React,{useEffect, createContext, useReducer,useContext} from "react";
import Navbar from "./components/Navbar";
import Signin from './components/screens/SignIn'
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost  from "./components/screens/CreatePost";
import './App.css'
import {BrowserRouter, Routes, Route, Switch, useNavigate} from 'react-router-dom'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
// import Reset from './components/screens/Reset'
// import NewPassword from './components/screens/Newpassword'
import SubscribedUserPosts from './components/screens/SubscribesUserPosts'
export const UserContext = createContext()
const Routing = ()=>{

   const history = useNavigate()
   const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
          dispatch({type:"USER",payload:user})
          // history('/')
        }
        else{
          // if(!history.location.pathname.startWith('/reset'))
          history('/signin')
        }
    },[])
  return(
   
    <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />  
        <Route exact path="/profile" element={<Profile/>} />
        <Route path="/create" element={<CreatePost/>}/>
        <Route path="/profile/:userid" element={<UserProfile/>}/>
        <Route path="/myfollowingpost" element={<SubscribedUserPosts/>}/>
        {/* <Route exact path="/reset" element={<Reset/>}/>
        
       <Route path="/reset/:token" element={<NewPassword />}/> */}
  
    </Routes>
  
  )
}


function App() {
const [state, dispatch] = useReducer(reducer,initialState)

  return (
    <UserContext.Provider value={{state,dispatch}}> 
    <BrowserRouter>
        <Navbar/>
        <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
 
    

  );
}

export default App;
