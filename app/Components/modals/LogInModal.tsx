"use client";
import React, { useState } from "react";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { openLogInModel, closeLogInModel } from "@/redux/Slices/modalSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
import { auth } from "@/firebase";
import { signinUser } from "@/redux/Slices/userSlice";

const LogInModal = () => {
  interface FormProp {
    email: string;
    password: string;
  }

  const [formData, setFormData] = useState<FormProp>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const isOpen = useSelector((state: RootState) => state.modals.logInModalOpen);
  
  const dispatch: AppDispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      dispatch(closeLogInModel());
      setFormData({ email: "", password: "" });
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

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

      dispatch(closeLogInModel());
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div>
      <button
        className="bg-black text-white rounded-full px-5 py-2"
        onClick={() => dispatch(openLogInModel())}
      >
        Log In
      </button>
      <Modal
        className="flex justify-center items-center"
        open={isOpen}
        onClose={() => dispatch(closeLogInModel())}
      >
        <div className="w-full h-full relative sm:w-[600px] sm:h-fit sm:rounded-xl bg-white">
          <XMarkIcon
            className="w-7 h-7 absolute top-4 right-4 cursor-pointer"
            onClick={() => dispatch(closeLogInModel())}
          />
          <form className="pt-14 pb-14 px-4 sm:px-20" onSubmit={handleLogin}>
            <h1 className="text-3xl font-bold mb-10">Log In to your account</h1>
            <div className="w-full space-y-5 flex flex-col mb-10">
              <input
                className="w-full h-[65px] border-2 border-gray-200 outline-none ps-5 rounded-[4px] focus:border-gray-400 transition"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email"
                type="email"
              />
              <input
                className="w-full h-[65px] border-2 border-gray-200 outline-none ps-5 rounded-[4px] focus:border-gray-400 transition"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Password"
                type="password"
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex items-center flex-col">
              <button
                className="w-full h-[54px] bg-black text-white rounded-[4px] hover:bg-gray-900 transition"
                type="submit"
              >
                Log In
              </button>
              <span className="text-base font-semibold my-2">Or</span>
              <button
                className="w-full h-[54px] bg-black text-white rounded-[4px] hover:bg-gray-900 transition"
                type="button"
                onClick={() => handleGuestLogIn()}
              >
                Log In as Guest
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default LogInModal;
