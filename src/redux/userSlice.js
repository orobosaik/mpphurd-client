import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
	currentUser: null,
	loading: null,
	error: null,
	chat: {
		totalUnreadCount: "",
		chatList: {},
		activeList: [],
		typingList: [],
		allDirectMessages: [],
	},
	messages: [],
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
			state.chat = {
				totalUnreadCount: "",
				chatList: {},
				activeList: [],
				typingList: [],
				allDirectMessages: [],
			};
		},
		setChat: (state, action) => {
			state.chat = action.payload;
		},
		setAllDirectMessages: (state, action) => {
			state.chat.allDirectMessages = action.payload;
		},
		addMessage: (state, action) => {
			state.chat.allDirectMessages = [
				...state.chat.allDirectMessages,
				action.payload,
			];
		},
		startTyping: (state, action) => {
			state.chat.typingList = [...state.chat.typingList, action.payload];
		},
		endTyping: (state, action) => {
			const newList = state.chat.typingList.filter((f) => f !== action.payload);
			state.chat.typingList = newList;
		},
		setActiveList: (state, action) => {
			state.chat.activeList = action.payload;
		},
		setChatList: (state, action) => {
			state.chat.chatList = action.payload;
		},
		setTotalUnreadCount: (state, action) => {
			state.chat.totalUnreadCount = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(PURGE, (state) => {
			return initialState;
		});
	},
});

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	logout,
	setChat,
	setAllDirectMessages,
	addMessage,
	startTyping,
	endTyping,
	setActiveList,
	setChatList,
	setTotalUnreadCount,
} = userSlice.actions;
export default userSlice.reducer;
