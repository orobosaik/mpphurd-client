import axios from "axios";
import userSlice, { logout } from "../redux/userSlice";
import { resetOfficeData } from "../redux/appSlice";
import { persistor } from "../redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socket } from "./socket";
import { toast } from "react-toastify";

export const fetchInstance = axios.create({
	baseURL: import.meta.env.VITE_SERVER,
	withCredentials: true,
	// timeout: 10000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json;charset=UTF-8",
	},
});
export const fetchPostImage = axios.create({
	baseURL: import.meta.env.VITE_SERVER,
	withCredentials: true,
	// timeout: 10000,
	headers: { "Content-Type": "multipart/form-data" },
	// headers: {
	// 	Accept: "application/json",
	// 	"Content-Type": "application/json;charset=UTF-8",
	// },
});

//
// const timeoutDuration = 10000;
const timeoutDuration = import.meta.env.VITE_TIMEOUT;

export const setupInterceptors = (dispatch, navigate) => {
	const handleLogout = () => {
		// console.log("YAYAYAYAYAYA");

		// persistor.purge();

		socket.disconnect();
		socket.on("disconnect", () => {
			console.log(`I'm disconnected from the back-end`);
		});

		dispatch(logout());
		navigate("/");
		dispatch(resetOfficeData());
		setTimeout(() => {
			toast.warn("Connection expired", {});
		}, 200);
	};

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
			let message = error.response
				? error.response.data.message
				: error.message;

			if (
				message.toLowerCase() === "token is not valid" ||
				message.toLowerCase() === "you are not authenticated"
			) {
				handleLogout();
			}
			return Promise.reject(error);
		}
	);
};
