import axios from "axios";
import userSlice, { logout } from "../redux/userSlice";
import { resetOfficeData } from "../redux/appSlice";
import { persistor } from "../redux/store";
export const fetchInstance = axios.create({
	baseURL: import.meta.env.VITE_SERVER,
	withCredentials: true,
	// timeout: 10000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json;charset=UTF-8",
	},
});

//
const timeoutDuration = 10000;
// const timeoutDuration = import.meta.env.VITE_TIMEOUT;

fetchInstance.interceptors.request.use((config) => {
	config.timeout = timeoutDuration; // Wait for timeout duration in seconds before timing out

	config.signal = AbortSignal.timeout(timeoutDuration); // Wait for timeout duration in seconds before timing out

	return config;
});



fetchInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.code === "ECONNABORTED" || error.code === "ERR_CANCELED") {
			error.message = "Request timed out";
		}
		// let message = error.response ? error.response.data.message : error.message;

		// if (message === "Token is not valid") {
		// 	// userSlice.dispatch(logout())
		// 	persistor.dispatch(logout())
		// }
		return Promise.reject(error);
	}
);
