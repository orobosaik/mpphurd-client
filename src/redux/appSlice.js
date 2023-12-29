import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
	theme: "system",
	officeData: {
		active: false,
		listArray: [],
		startDate: new Date().toISOString().slice(0, 10),
		endDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
			.toISOString()
			.slice(0, 10),
		searchQuery: "",
		sort: "",
		scroll: "",
	},
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setTheme: (state, action) => {
			state.theme = action.payload;
		},
		setOfficeData: (state, action) => {
			state.officeData = action.payload;
		},
		resetOfficeData: (state) => {
			state.officeData = {
				listArray: [],
				startDate: "",
				endDate: "",
				searchQuery: "",
				sort: "",
				scroll: "",
			};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(PURGE, (state) => {
			return initialState;
		});
	},
});

export const { setTheme, setOfficeData, resetOfficeData } = appSlice.actions;
export default appSlice.reducer;
