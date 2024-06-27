import axios from "axios";

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
		return Promise.reject(error);
	}
);
