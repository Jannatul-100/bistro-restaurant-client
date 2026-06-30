import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { IoConstructSharp } from "react-icons/io5";
import useAxiosPublic from "../hooks/useAxiosPublic";


export const AuthContext = createContext(null);

// const auth = getAuth(app);

const AuthProviders = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();
    

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
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

   const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
    }

    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('current user', currentUser);
            if(currentUser){
                //get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false);
                    }
                })
            }
            else{
                //remove token , if token stored in the client side: localStorage, caching, in memory
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            
        });

        return unsubscribe;

    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logout,
        updateUserProfile,
        resetPassword,
        googleSignIn
    }



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;