import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name:"",
    username:"",
    email:"",
    uid:""
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinUser:(state,action)=>{
        state.name=action.payload.name;
        state.username=action.payload.username;
        state.email=action.payload.email;
        state.uid=action.payload.uid;
    },
    signoutUser(state){
        state.name="";
        state.username="";
        state.email="";
        state.uid="";
    }

  }
});

export const { signinUser, signoutUser } = userSlice.actions

export default userSlice.reducer