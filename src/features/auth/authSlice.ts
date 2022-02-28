import { User as FirebaseUser } from "@firebase/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type User = FirebaseUser & { businessId?: number };

interface AuthState {
  user: User | null;
}

const initialState: AuthState = { user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const selectUser = (state: RootState) => state.auth.user;

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
