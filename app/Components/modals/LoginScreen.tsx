"use client";

import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const LoginScreen = () => {
  const loadingScreenopen = useSelector(
    (state: RootState) => state.loading.loadingScreenOpen
  );

  return (
    <div
      className={`fixed top-0 left-0
     bottom-0 right-0
      z-50 flex transition-opacity duration-300
      items-center justify-center bg-gray-200
     ${loadingScreenopen ? 'opacity-100 z-50' : 'opacity-0 pointer-events-none -z-50'}`}
    ><div>
        <Image
          src={"/assets/logorbg.png"}
          alt="Logo"
          width={200}
          height={100}
        />
        <h1 className="text-6xl font-bold mb-10">LinkUp</h1>
        <Box sx={{ width: "100%" }}>
          <LinearProgress aria-label="Loading…" color="black" />
        </Box>
      </div>
    </div>
  );
};

export default LoginScreen;
