"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { closeSignUpModel, openSignUpModel,closeLogInModel,openLogInModel } from "@/redux/Slices/modalSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
   signInAnonymously
} from "firebase/auth";
import { auth } from "@/firebase";
import { signinUser, signoutUser } from "@/redux/Slices/userSlice";


const SignupModal = () => {
  interface FormProp {
    name: string;
    email: string;
    password: string;
  }

  const [formData, setFormData] = useState<FormProp>({
    name: "",
    email: "",
    password: "",
  });

  const isOpen = useSelector(
    (state: RootState) => state.modals.signUpModalOpen,
  );

  
  const [error, setError] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();

  async function handleSignUp() {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );

      await updateProfile(userCredentials.user, {
        displayName: formData.name,
      });

      dispatch(
        signinUser({
          name: userCredentials.user.displayName,
          username: userCredentials.user.email!.split("@")[0],
          email: userCredentials.user.email,
          uid: userCredentials.user.uid,
        }),
      );

      setFormData({ name: "", email: "", password: "" });
      dispatch(closeSignUpModel()); // close modal after success
    } catch (error) {
      console.error("Sign up error:", error);
      // optional: set error state and show inline message
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;

      dispatch(
        signinUser({
          name: currentUser.displayName,
          username: currentUser.email!.split("@")[0],
          email: currentUser.email,
          uid: currentUser.uid,
        }),
      );
    });

    return () => unsub();
  }, [dispatch]);

  async function handleGuestLogIn() {
    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      dispatch(
        signinUser({
          name: "Guest",
          username: `guest-${user.uid.slice(0, 6)}`,
          email: null,
          uid: user.uid,
        }),
      );

      dispatch(closeSignUpModel());
      dispatch(closeLogInModel());
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div>
      <button
        className="bg-black text-white rounded-full px-4 py-2"
        onClick={() => {
          dispatch(openSignUpModel());
        }}
      >
        Sign Up
      </button>
      <Modal
        className="flex justify-center items-center"
        open={isOpen}
        onClose={() => {
          dispatch(closeSignUpModel());
        }}
      >
        <div className="w-full h-full relative sm:w-[600px] sm:h-fit sm:rounded-xl bg-white outline-none ">
          <XMarkIcon
            className="w-7 h-7 absolute top-4 right-4 cursor-pointer"
            onClick={() => {
              dispatch(closeSignUpModel());
            }}
          />
          <div className="pt-14 pb-14 px-4 sm:px-20">
            <h1 className="text-3xl font-bold mb-10">Create your account</h1>
            <div className="w-full space-y-5 flex flex-col mb-10">
              <input
                className="w-full h-[54px] border-2 border-gray-200 outline-none ps-5 rounded-[4px] 
                focus:border-gray-400 transition "
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Name"
                type="text"
              />
              <input
                className="w-full h-[54px] border-2 border-gray-200 outline-none ps-5 rounded-[4px] 
                focus:border-gray-400 transition "
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email"
                type="email"
              />
              <input
                className="w-full h-[54px] border-2 border-gray-200 outline-none ps-5 rounded-[4px] 
                focus:border-gray-400 transition "
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="flex items-center flex-col">
              <button
                className="w-full h-[54px] bg-black text-white rounded-[4px] hover:bg-gray-900 transition"
                type="button"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
              <span className="text-base font-semibold my-3">Or</span>
              <button
                className="w-full h-[54px] bg-black text-white rounded-[4px] hover:bg-gray-900 transition"
                type="button"
                onClick={() =>handleGuestLogIn()}
              >
                Log In as Guest
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SignupModal;
