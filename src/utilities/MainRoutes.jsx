import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Home from "../pages/home/Home";
import Plan from "../pages/plan/Plan.jsx";
import CreateApplication from "../pages/createApplication/CreateApplication";
import Office from "../pages/office/Office";
import Minute from "../pages/minute/Minute";
import CreateBill from "../pages/createBill/CreateBill";
import ViewBill from "../pages/viewBill/ViewBill";
import ActivitiesView from "../pages/activitiesView/ActivitiesView";
import Analysis from "../pages/analysis/Analysis";
import BuildingControl from "../pages/buildingControl/BuildingControl";
import Petition from "../pages/petition/Petition";
import Approval from "../pages/approval/Approval";
import DocumentView from "../pages/documentView/DocumentView";
import LoginPage from "../pages/loginPage/LoginPage";
import { useSelector } from "react-redux";
import { setThemeColor } from "./themeColor";

export default function MainRoutes() {
	const navigate = useNavigate();
	const { currentUser } = useSelector((state) => state.user);
	const { theme } = useSelector((state) => state.app);
	console.log(currentUser);

	useEffect(() => {
		setThemeColor(theme);
	}, [theme]);

	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
		}
		// return () => {};
	}, [currentUser]);

	return (
		<>
			{currentUser ? (
				<Routes>
					{/* HOME PAGE */}
					<Route path="/">
						<Route
							index
							element={!currentUser ? <Navigate to="/login" /> : <Home />}
						/>
					</Route>

					{/* LOGIN PAGE */}
					<Route path="/login">
						<Route
							index
							element={!currentUser ? <LoginPage /> : <Navigate to="/" />}
						/>
					</Route>

					{/* PERMIT | APPROVAL */}
					<Route path="/permit">
						<Route index element={currentUser && <Approval />} />
						<Route path="new" element={<CreateApplication />} />
						<Route path="planId">
							<Route
								index
								element={!currentUser ? <Navigate to="/login" /> : <Plan />}
							/>
							<Route path="bills" element={<ViewBill />} />
							<Route path="createbill" element={<CreateBill />} />
							<Route path="minute" element={<Minute />} />
							<Route path="documents" element={<DocumentView />} />
						</Route>
					</Route>

					{/* PETITION */}
					<Route path="/petition">
						<Route index element={<Petition />} />
					</Route>

					{/* BUILDING CONTROL */}
					<Route path="/control">
						<Route index element={<BuildingControl />} />
					</Route>

					{/* OFFICE */}
					<Route path="/office">
						<Route index element={<Office />} />
					</Route>

					{/* ACTIVITIES */}
					<Route path="/activities">
						<Route index element={<ActivitiesView />} />
					</Route>
					{/* ANALYSIS */}
					<Route path="/analysis">
						<Route index element={<Analysis />} />
					</Route>
				</Routes>
			) : (
				<LoginPage />
			)}
		</>
	);
}

// export default MainRoutes;
