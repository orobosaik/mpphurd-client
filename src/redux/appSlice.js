import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
	theme: "system",
	officeData: {
		active: false,
		type: "current",
		data: [],
		listArray: [],
		startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
			.toISOString()
			.slice(0, 10),
		endDate: new Date().toISOString().slice(0, 10),
		searchQuery: null,
		searchResult: [],
		searchData: [],
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
				active: false,
				type: "current",
				data: [],
				listArray: [],
				startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
					.toISOString()
					.slice(0, 10),
				endDate: new Date().toISOString().slice(0, 10),
				searchQuery: null,
				searchResult: [],
				searchData: [],
				sort: "",
				scroll: 0,
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
