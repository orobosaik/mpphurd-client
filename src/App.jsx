import { useEffect, useState } from "react";

import "./App.css";
import AdminRoutes from "./utilities/AdminRoutes";
import MainRoutes from "./utilities/MainRoutes";

function App() {
	// const [view, setView] = useState(null);
	const [user, setUser] = useState(import.meta.env.VITE_USER_TYPE);

	useEffect(() => {
		// 	const host = window.location.host;
		// 	// const path = window.location.pathname;
		// 	// const arr = path.split("/");
		// 	// const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : 1);
		// 	const arr = host.split(".");
		// 	if (arr[0].toLowerCase() === "admin-mpphurd") {
		// 		setView("admin");
		// 	} else if (arr[0].toLowerCase() === "mpphurd") {
		// 		setView("staff");
		// 	}
		// 	// }
		setUser(import.meta.env.VITE_USER_TYPE);
	}, [window.location]);

	// const user = import.meta.env.VITE_USER_TYPE;

	return (
		<>
			{user === "staff" ? (
				<MainRoutes />
			) : user === "admin" ? (
				<AdminRoutes />
			) : (
				"NO USER TYPE"
			)}
		</>
	);
}

export default App;
