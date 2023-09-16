import { useEffect, useState } from "react";

import "./App.css";
import AdminRoutes from "./utilities/AdminRoutes";
import MainRoutes from "./utilities/MainRoutes";

function App() {
	// const [subDomain, setSubDomain] = useState(null);
	const [firstRoute, setFirstRoute] = useState(null);

	useEffect(() => {
		// const host = window.location.host;
		const path = window.location.pathname;

		// const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : -1);
		const arr = path.split("/")

		if (arr.length > 1) setFirstRoute(arr[1].toLowerCase());
		console.log("subdomain: "+firstRoute);
		console.log("path: "+path);
		console.log("all arr :"+arr);
		console.log("arr :"+arr[1]);
	}, []);

	return (
		<>
			{!firstRoute ? (
				<MainRoutes />
			) : firstRoute !== "admin" ? (
				<MainRoutes />
			) : (
				<AdminRoutes />
			)}
		</>
	);
}

export default App;
