"use client";

import Header from "../../../components/ui/Header";
import Input from "../../../components/inputs/Input";
import Button from "../../../components/ui/Button";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { setEmail, setPassword } from "../../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.authentication);
  const [error, setError] = useState(null);
  const router = useRouter();

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const signIn = async () => {
    let result = null;
    let err = null;
    if (!email || !password) {
      setError(
        "Please make sure to fill out both the email and password fields to proceed with the login."
      );
      return;
    }
    if (!isValidEmail(email)) {
      setError("Invalid email format. Please enter a valid email address.");
      return;
    }
    try {
      result = await signInWithEmailAndPassword(auth, email, password);
      Cookies.set('loggedin', true);
      // router.push("/stepper");
    } catch (error) {
      err = error;
      err = setError("Incorrect email or password. Please try again.");
    }
    dispatch(setEmail(""));
    dispatch(setPassword(""));
    return { err, result };
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full">
        <div className="flex justify-center items-center">
          <Header title="Login Page" subtitle="Login to your account" center />
        </div>
        <div className="flex justify-center items-center ">
          <div className=" w-[40%] ">
            <div className="border-2 rounded-xl p-16 pt-10">
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Input
                label="Email *"
                placeholder="joe.doe@example.com"
                type="email"
                value={email}
                onChange={(e) => {
                  dispatch(setEmail(e.target.value));
                }}
              />
              <Input
                label="Password *"
                placeholder="*******"
                type="password"
                value={password}
                onChange={(e) => {
                  dispatch(setPassword(e.target.value));
                }}
              />
              <Button name="Login" onClick={signIn} />
              <div className="flex justify-center items-center mt-10">
                <p className="font-light">
                  Create a new account{" "}
                  <Link
                    href="/auth/signup"
                    className="font-medium hover:underline"
                  >
                    Singup
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
