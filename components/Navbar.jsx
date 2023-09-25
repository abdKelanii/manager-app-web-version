"use client";

import { FaUserCircle } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase/firebaseConfig";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ListItem from "./ListItem";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

const Navbar = () => {
  const auth = getAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const currentUser = auth.currentUser;
  const userId = currentUser ? currentUser.uid : null;

  useEffect(() => {
    const nameRef = ref(db, `/users/${userId}/PersonalDetails/FirstName`);
    onValue(nameRef, (snapshot) => {
      const firstName = snapshot.val();
      if (firstName) {
        setName(firstName);
      }
    });
  }, [db, userId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserAuthenticated(true);
      } else {
        setIsUserAuthenticated(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        Cookies.remove("loggedin");
        console.log("Sign-out successful.");
        router.push("/");
      })
      .catch((error) => {
        console.log("An error happened.");
      });
    setIsOpen(false);
  };

  return (
    <div className="h-20 border-b shadow-md">
      <div className="flex justify-center items-center h-full w-full">
        <div className="flex justify-between w-full h-full items-center px-28">
          <div className="flex gap-x-5 h-full">
            <div className="flex justify-center items-center h-ful">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  width="45"
                  height="45"
                  alt="dill-logo"
                />
              </Link>
            </div>
            <div className="h-full flex justify-center items-center">
              <h2 className="font-bold text-2xl"> setting</h2>
            </div>
          </div>

          {isUserAuthenticated && (
            // X element
            <div>
              <div
                className="flex gap-x-5 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="flex gap-x-1 pt-1 hover:text-blue-600">
                  <div className="pt-[1px]">
                    {/* Arrow down icon */}
                    <BiChevronDown size={22} />
                  </div>
                  <div className="">{name}</div>
                </div>
                <div className="text-[#194455]">
                  {/* User icon */}
                  <FaUserCircle size={28} />
                </div>
              </div>
              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-24 overflow-hidden right-32 top-[70px] text-sm">
                  <div className="flex flex-col cursor-pointer ">
                    <ListItem label="Logout" onClick={handleSignOut} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
