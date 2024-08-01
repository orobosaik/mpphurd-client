import { useEffect, useState } from "react";

import "./App.css";
import AdminRoutes from "./utilities/AdminRoutes";
import MainRoutes from "./utilities/MainRoutes";
import { ToastContainer } from "react-toastify";
import AnimatedBackground from "./widgets/animatedBackground/AnimatedBackground";
// import { socket } from "./utilities/socket";

function App() {
	const [view, setView] = useState(null);

	useEffect(() => {
		// socket.on("users", (data) => {
		// 	console.log("USER:", data);
		// });
		const host = window.location.host;

		// const path = window.location.pathname;
		// const arr = path.split("/");

		// const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : 1);
		const arr = host.split(".");

		if (
			arr[0].toLowerCase() === "admin-mpphurd" ||
			arr[0].toLowerCase() === "test-mpphurdadmin" ||
			arr[0].toLowerCase() === "mpphurdadmintest"
		) {
			setView("admin");
		} else if (
			arr[0].toLowerCase() === "mpphurd" ||
			arr[0].toLowerCase() === "test-mpphurduser" ||
			arr[0].toLowerCase() === "mpphurdtest"
		) {
			setView("staff");
		}

		// if (arr.length < 3 && arr[0].toLowerCase() === "admin-mpphurd") {
		// 	setView("admin");
		// } else if (arr.length < 3 && arr[0].toLowerCase() === "mpphurd") {
		// 	setView("staff");
		// }
	}, [window.location.host]);

	return (
		<>
			<AnimatedBackground />
			<div className="pageWrapper"></div>

			{view === "staff" ? (
				<MainRoutes />
			) : view === "admin" ? (
				<AdminRoutes />
			) : (
				""
			)}
			<ToastContainer />
		</>
	);
}

export default App;
