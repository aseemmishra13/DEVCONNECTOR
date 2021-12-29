import axios from "axios";
import {setALert} from './alert'
import api from '../utils/api';
import {GET_PROFILE,GET_PROFILES,GET_REPOS,PROFILE_ERROR,UPDATE_PROFILE,CLEAR_PROFILE,DELETE_ACCOUNT} from './types'

export const getCurrentProfile = () => async dispatch =>{
    try {
        const res = await axios.get('api/profile/me')

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
        
    }
}

export const getProfiles = () => async dispatch =>{
    dispatch({type:CLEAR_PROFILE})
    try {
        const res = await api.get('/profile')

        dispatch({
            type:GET_PROFILES,
            payload:res.data
        })
        
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
        
    }
}
export const getProfileById = (userId) => async (dispatch) =>{
   
    try {
        const res = await api.get(`/profile/user/${userId}`)

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
        
    }
}

export const getGithubRepos = (username) => async dispatch =>{
   
    try {
        const res = await api.get(`/profile/github/${username}`)

        dispatch({
            type:GET_REPOS,
            payload:res.data
        })
        
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
        
    }
}

export const createProfile = (formData, navigate, edit = false)=> async dispatch =>{
    try {
        const config ={
            header:{
                'Content-Type':'application/json'
            }
        }

        const res = await axios.post('/api/profile',formData,config)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })

        dispatch(setALert(edit? 'Profile updated': 'Profile Created','success'));

        if(!edit){
            navigate('/dashboard')
        }
        
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error=> dispatch(setALert(error.msg,'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
        

    
    }
}


export const addExperience = (formData,navigate)=>async dispatch=>{
    try {
        const config ={
            header:{
                'Content-Type':'application/json'
            }
        }

        const res = await axios.put('/api/profile/experience',formData,config)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })

        dispatch(setALert( 'Expereince Added', 'success'));

        
            navigate('/dashboard')
    
        
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error=> dispatch(setALert(error.msg,'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
        

    
    }
}

export const addEducation = (formData,navigate)=>async dispatch=>{
    try {
        const config ={
            header:{
                'Content-Type':'application/json'
            }
        }

        const res = await axios.put('/api/profile/education',formData,config)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })

        dispatch(setALert( 'Education Added', 'success'));

        
            navigate('/dashboard')
    
        
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error=> dispatch(setALert(error.msg,'danger')))
        }
        

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
        

    
    }
}

export const deleteExperience=(id)=>async dispatch=>{
    try {
        const res = await axios.delete(`api/profile/experience/${id}`)
        
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setALert( 'Experience deleted', 'success'));
    } catch (err) {
        

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
        
        
    }
}

export const deleteEducation=(id)=>async dispatch=>{
    try {
        const res = await axios.delete(`api/profile/education/${id}`)
        
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setALert( 'Education deleted', 'success'));
    } catch (err) {
        

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
        
        
    }
}

export const deleteAccount=()=>async dispatch=>{
    if(window.confirm('Are you sure you want to delete your profile?'))
    {try {
         await axios.delete(`api/profile`)
        
        dispatch({
            type: CLEAR_PROFILE,
            
        })

        dispatch({
            type: DELETE_ACCOUNT,
            
        })

        dispatch(setALert( 'Your account has been deleted'));
    } catch (err) {
        

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg:err.response.statusText,status:err.response.status}
        })
        
        
    }}
}