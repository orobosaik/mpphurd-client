import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
	currentUser: null,
	loading: null,
	error: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginStart: (state) => {
			state.loading = true;
			state.error = null;
			state.currentUser = null;
		},
		loginSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.loading = null;
			state.error = null;
		},
		loginFailure: (state) => {
			state.currentUser = null;
			state.loading = null;
			state.error = true;
		},
		logout: (state) => {
			state.currentUser = null;
			state.loading = null;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(PURGE, (state) => {
			return initialState;
		});
	},
});

export const { loginStart, loginSuccess, loginFailure, logout } =
	userSlice.actions;
export default userSlice.reducer;
