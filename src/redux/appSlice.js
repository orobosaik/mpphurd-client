import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
	theme: "system",
	officeData: {
		active: false,
		data: [],
		listArray: [],
		startDate: "",
		endDate: "",
		searchQuery: "",
		sort: "",
		scroll: 0,
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
