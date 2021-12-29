
import './App.css';
import React, { Fragment,useEffect} from 'react'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import EditProfile from './components/Profile-form/EditProfile';
import AddExperience from './components/Profile-form/AddExperience';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import PrivateRoute from './components/routing/PrivateRoute';
import { Provider} from 'react-redux'
import store from './store'
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import CreateProfile from './components/Profile-form/CreateProfile';
import AddEducation from './components/Profile-form/AddEducation';

if(localStorage.token){
  setAuthToken(localStorage.token)
}



const App=()=> {

useEffect(()=>{
  store.dispatch(loadUser())
},[])

return (

<Provider store ={store}>
<Router>
    <Fragment>
     
      <Navbar/>
      <Routes>
      <Route exact path= "/" element = { <Landing />} />
      </Routes>
      <section className='container'>
        <Alert />
        
          <Routes>
            <Route exact path = "register" element = {<Register />} />
            <Route exact path = "login" element = {<Login />} />
            <Route exact path = "profiles" element = {<Profiles />} />
            <Route exact path = "profile/:id" element = {<Profile />} />
            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
            <Route path="/create-profile" element={<PrivateRoute component={CreateProfile} />}/>
            <Route path="/edit-profile" element={<PrivateRoute component={EditProfile} />}/>
            <Route path="/add-experience" element={<PrivateRoute component={AddExperience} />}/>
            <Route path="/add-education" element={<PrivateRoute component={AddEducation} />}/>
          </Routes>
      
      </section>
    </Fragment>
</Router> 
</Provider>
)}


export default App;
