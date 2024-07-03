import { useEffect, useState } from "react";

import "./App.css";
import AdminRoutes from "./utilities/AdminRoutes";
import MainRoutes from "./utilities/MainRoutes";
import { ToastContainer } from "react-toastify";

function App() {
	const [view, setView] = useState(null);

	useEffect(() => {
		const host = window.location.host;

		// const path = window.location.pathname;
		// const arr = path.split("/");

		// const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : 1);
		const arr = host.split(".");


		if (arr[0].toLowerCase() === "admin-mpphurd") {
			setView("admin");
		} else if (arr[0].toLowerCase() === "mpphurd") {
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
			{view === "staff" ? (
				<MainRoutes />
			) : view === "admin" ? (
				<AdminRoutes />
			) : (
				""
			)}
			<ToastContainer/>
		</>
	);
}

export default App;
