"use client";

import Stepper from "./stepper/page";
import LoginPage from "./auth/login/page";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false); 
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex justify-center mb-10">
      {user ? <Stepper /> : <LoginPage />}
    </div>
  );
}
