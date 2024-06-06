import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import { GithubAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from './../hooks/useAxiosPublic';
 

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({children}) => {

    const [user, setUser]= useState();
    const [loading, setLoading]= useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic =useAxiosPublic();

     // github sign in 
     const githubProvider =  new GithubAuthProvider();

     const signInwithGithub = () =>{
         setLoading(true);
         return  signInWithPopup(auth, githubProvider)
         
     }

    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const createuser = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () =>{
        setLoading(true)
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) =>{
       return updateProfile(auth.currentUser, {
            displayName:name, photoURL: photo
          }) 
    }


    useEffect(()=>{
     const unsubsribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            if(currentUser){
                // get user and store client
                const userInfo = {email:currentUser.email};
                axiosPublic.post('/jwt',userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                        setLoading(false);
                    }
                })
            }
            else{
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            console.log('current user', currentUser);
            

        })
        return () =>{
            return unsubsribe();
        }
    },[axiosPublic])
    const authInfo = {
        user,
        loading,
        createuser,
        signIn,
        logOut,
        updateUserProfile,
        googleSignIn,
        signInwithGithub


    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;