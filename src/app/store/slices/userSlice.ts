import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  token: string | null;
  user: {
    id: string;
    username: string;
    email: string;
  } | null;
}

const initialState: UserState = {
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      // Persist to localStorage
      localStorage.setItem("userToken", action.payload.token || "");
      localStorage.setItem("userData", JSON.stringify(action.payload.user));
    },
    clearUser: (state) => {
      state.token = null;
      state.user = null;
      // Clear from localStorage
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
