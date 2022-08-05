import { createContext, useReducer, useEffect} from "react";
import AuthReducer from "./AuthReducer";


const  INIT_STATE = {
    currentUser: JSON.parse(localStorage.getItem("user")) || null
};


export const AuthContext = createContext(INIT_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INIT_STATE);
    useEffect(() => {
       localStorage.setItem("user", JSON.stringify(state.currentUser))
    }, [state.currentUser])

    return (
        <AuthContext.Provider value = {{currentUser: state.currentUser, dispatch}}>
          {children}
        </AuthContext.Provider>
    )
}