"use client";

import Header from "../../../components/ui/Header";
import Input from "../../../components/inputs/Input";
import Button from "../../../components/ui/Button";
import Link from "next/link";
import { auth } from "../../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createNewUser } from "../../../firebase/databaseServices";
import {
  setEmail,
  setPassword,
  setFirstName,
  setLastName,
  setBirthDate,
  setRepeatPassword,
} from "../../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


const SignupPage = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { email, password, repeatPassord, firstName, lastName, birthDate } =
    useSelector((state) => state.authentication);
  const router = useRouter();

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const singUp = async () => {
    if (!email || !password || !firstName || !lastName || !birthDate) {
      setError("Please make sure to fill all the required fields.");
      return;
    } else if (password !== repeatPassord) {
      setError("Please ensure Password and Repeat Password fields match");
      return;
    } else if (!isValidEmail(email)) {
      setError("Invalid email format. Please enter a valid email address.");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      createNewUser(result.user.uid, firstName, lastName, birthDate);
      router.push("/auth/login");
    } catch (err) {
      console.error(err);
    }
    dispatch(setEmail(""));
    dispatch(setPassword(""));
    dispatch(setFirstName(""));
    dispatch(setLastName(""));
    dispatch(setBirthDate(""));
    dispatch(setRepeatPassword(""));
  };

  return (
    <div className="flex justify-center items-center w-full mb-8">
      <div className="w-full">
        <div className="flex justify-center items-center">
          <Header title="Signup Page" subtitle="Create a new account" center />
        </div>
        <div className="flex justify-center items-center">
          <div className=" w-[40%] ">
            <div className="border-2 rounded-xl p-16 pt-10">
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Input
                label="First Name *"
                placeholder="Joe"
                type="text"
                value={firstName}
                onChange={(e) => {
                  dispatch(setFirstName(e.target.value));
                }}
              />
              <Input
                label="Last name *"
                placeholder="Doe"
                type="text"
                value={lastName}
                onChange={(e) => {
                  dispatch(setLastName(e.target.value));
                }}
              />
              <Input
                label="Date of birth *"
                placeholder=""
                type="date"
                value={birthDate}
                onChange={(e) => {
                  dispatch(setBirthDate(e.target.value));
                }}
              />
              <Input
                label="Email *"
                placeholder="joe.doe@example.com"
                type="email"
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
              />
              <Input
                label="Password *"
                placeholder="*******"
                type="password"
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
              />
              <Input
                label="Repeat password *"
                placeholder="*******"
                type="password"
                value={repeatPassord}
                onChange={(e) => dispatch(setRepeatPassword(e.target.value))}
              />
              <Button name="Signup" onClick={singUp} />
              <div className="flex justify-center items-center mt-10">
                <p className="font-light">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="font-medium hover:underline"
                  >
                    Login
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

export default SignupPage;
