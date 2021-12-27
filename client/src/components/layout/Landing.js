import React, {Fragment} from 'react'
import {Link, Navigate} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';



const Landing = ({auth:{isAuthenticated,loading}}) => {

  if(isAuthenticated){
    return <Navigate to ='/dashboard' />
  }
  const authLinks = (
    <div className="landing-inner">
            <h1 className="x-large">Developer Connector</h1>
            <p className="lead">
              You are logged in
            </p>
           
          </div>

  )

  const guestLinks =(
    <div className="landing-inner">
            <h1 className="x-large">Developer Connector</h1>
            <p className="lead">
              Create a developer profile/portfolio, share posts and get help from
              other developers
            </p>
            <div className="buttons">
              <Link to ="/register" className="btn btn-primary">Sign Up</Link>
              <Link to ="/login" className="btn btn-light">Login</Link>
            </div>
          </div>

  )
    return (
        <section className="landing">
        <div className="dark-overlay">
        { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
          
        </div>
      </section>
    )
}
Landing.propTypes={
 
  auth:PropTypes.object.isRequired,
}
  
const mapStateToProps=state=>({
  auth: state.auth
  
})

export default connect(mapStateToProps)(Landing)
