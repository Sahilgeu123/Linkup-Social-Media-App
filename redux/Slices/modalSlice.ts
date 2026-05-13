import { createSlice } from "@reduxjs/toolkit";
import { comment } from "postcss";

const initialState = {
  signUpModalOpen: false,
  logInModalOpen:false,
  commentModalOpen:false,
  commentModalClose:false,
  commentPostDetails:{
    name:"",
    username:"",
    id:"",
    text:"",
  }

};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignUpModel: (state) => {
      state.signUpModalOpen = true;
    },
    closeSignUpModel: (state) => {
      state.signUpModalOpen = false;
    },
    openLogInModel: (state) => {
      state.logInModalOpen = true;
    },
    closeLogInModel: (state) => {
      state.logInModalOpen = false;
    },
    openCommentModal: (state) => {
      state.commentModalOpen = true;
    },
    closeCommentModel: (state) => {
      state.commentModalOpen = false;
    },
    setCommentDetails:(state,action)=>{
      state.commentPostDetails.name = action.payload.name
      state.commentPostDetails.username = action.payload.username
      state.commentPostDetails.id = action.payload.id
      state.commentPostDetails.text = action.payload.text
    }
  },
});

export const { openSignUpModel, closeSignUpModel, openLogInModel,closeLogInModel, openCommentModal,closeCommentModel,setCommentDetails } = modalSlice.actions;

export default modalSlice.reducer;
