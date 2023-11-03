import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { auth, googleProvider } from "../utils/firebase.config";
import {
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import { FirebaseInitialState, FirebaseProviderProps } from "../types";

export const FirebaseContext = createContext<FirebaseInitialState>({
  user: null,
  signInWithGoogle: () => {
    return signInWithPopup(auth, googleProvider);
  },
  logOut: async () => {
    await signOut(auth);
  },
});

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  const logOut = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        user,
        signInWithGoogle,
        logOut,
      }}
    >
      {children ? children : <Outlet />}
    </FirebaseContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFirebaseContext = () => {
  return useContext(FirebaseContext);
};
