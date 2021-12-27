import axios from "axios";
import {setALert, setAlert} from './alert'
import {GET_PROFILE,PROFILE_ERROR} from './types'

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