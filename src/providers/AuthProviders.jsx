import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { IoConstructSharp } from "react-icons/io5";


export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProviders = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () =>{
        setLoading(true);
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) =>{
       return  updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo 
        });
   }

    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false);
        });

        return unsubscribe;

    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logout,
        updateUserProfile
    }



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;