import React, { createContext, useEffect, useReducer } from 'react'
import { authReducer } from '../reducers/reducer';
import {login, findUser} from '../api/auth'
import axios from "axios";
import { LOCAL_TOKEN } from '../api/instance';
import setToken from '../api/setToken';
import { useCookies } from "react-cookie";

export const AppContext = createContext();
const AppContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        isLoading:true,
        isAuthenticated:false,
        user:null
    })
    
    const [cookies, setCookie, removeCookie] = useCookies();
    // set auth
    const loadUser = async() =>{
        if(localStorage[LOCAL_TOKEN]){
            setToken(localStorage[LOCAL_TOKEN])
        }

       try {
        const response = await axios.get('http://localhost:9000/api/auth');
        
        if(response.data.success){
            dispatch({type:'SET_AUTH', payload:{isAuthenticated:true, user:response.data.data}});
        }
       } catch (error) {
            setToken(null)
            localStorage.removeItem(LOCAL_TOKEN)
            dispatch({type:'SET_AUTH', payload:{isAuthenticated:false, user:null}});
       }
    }

    useEffect(()=> loadUser, []);

    const loginUser = async (data) => {

        const res = await login(data);
        try {
            if(res.data.success){
                localStorage.setItem(LOCAL_TOKEN, res.data.token)
            }
             await loadUser();
             return res;
        } catch (error) {
            if (error.res.data.message) return error.res.data.message
			else return { success: false, message: error.message }
        }   
    }

    const logout = () => {
        setToken(null)
        localStorage.removeItem(LOCAL_TOKEN)
        removeCookie('token', {path:"/"});
        dispatch({type:'SET_AUTH', payload:{isAuthenticated:false, user:null}});
    }

  return (
   <AppContext.Provider value={{state, dispatch, loginUser, logout}} >
    {children}
   </AppContext.Provider>
  )
}

export default AppContextProvider