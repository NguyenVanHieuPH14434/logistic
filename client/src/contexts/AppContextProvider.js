import React, { createContext, useEffect, useReducer } from 'react'
import { authReducer } from '../reducers/reducer';
import {login, findUser} from '../api/auth'

export const AppContext = createContext();
const AppContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        isLoading:true,
        isAuthenticated:false,
        user:null
    })

    // set auth
    const loadUser = async(id) =>{
        const response = await findUser(id);
        
        if(response.data.success){
            dispatch({type:'SET_AUTH', payload:{isAuthenticated:true, user:response.data.user}});
        }
    }

    useEffect(()=> loadUser, []);

    const login1 = async (data) => {
        const res = await login(data);
        
        try {
        if(res.data.status){
        }
        await loadUser(res.data.data._id);
        return res.data;
        } catch (error) {
            if (error.res.data) return error.res.data
			else return { success: false, message: error.message }
        }   
    }

  return (
   <AppContext.Provider value={{state, dispatch, loadUser, login1}} >
    {children}
   </AppContext.Provider>
  )
}

export default AppContextProvider