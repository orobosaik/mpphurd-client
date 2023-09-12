import { useEffect, useState } from "react";

import "./App.css";
import AdminRoutes from "./utilities/AdminRoutes";
import MainRoutes from "./utilities/MainRoutes";

function App() {
	const [subdomain, setSubDomain] = useState(null);

	useEffect(() => {
		const host = window.location.host;

		const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : -1);

		if (arr.length > 0) setSubDomain(arr[0].toLowerCase());
		console.log(subdomain);
		console.log(host);
		console.log(arr);
	}, []);

	return (
		<>
			{!subdomain ? (
				<MainRoutes />
			) : subdomain !== "admin" ? (
				<MainRoutes />
			) : (
				<AdminRoutes />
			)}
		</>
	);
}

export default App;
