
import React, {Fragment, useState} from 'react'
import {Link} from 'react-router-dom'


const Login = () => {

    const [formData, setformData]=useState({
     
        email:'',
        password:'',
      
    });

    const {email,password} = formData;
    const onChange = e => setformData({...formData, [e.target.name]: e.target.value})
    const onSubmit = async e => {
        e.preventDefault();
        
            console.log('success')
            // const newUser = {
            //     name,
            //     email,
            //     password
            // }
            // try {
            //     const config ={
            //         headers:{
            //             'content-type':'application/json'
            //         }
            //     }
            //     const body = JSON.stringify(newUser)
            //     const res =  await axios.post('/api/users',body,config);
            //     console.log(res.data)
                
            // } catch (err) {
            //     console.error(err.response.data)
                
            // }
        
    }
    return (
        <Fragment>
          <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sing in to your Account</p>
      <form className="form" onSubmit={e=> onSubmit(e)}>
        
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value ={email} onChange={e => onChange(e)} required />
          
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value ={password} onChange={e => onChange(e)} required
          />
        </div>
       
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/register">Sign Up</Link>
      </p> 
        </Fragment>
    )
}

export default Login