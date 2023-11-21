import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
	theme: "system",
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setTheme: (state, action) => {
			state.theme = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(PURGE, (state) => {
			return initialState;
		});
	},
});

export const { setTheme } = appSlice.actions;
export default appSlice.reducer;
