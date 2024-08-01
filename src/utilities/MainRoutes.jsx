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
import OfficeSelect from "../pages/officeSelect/OfficeSelect.jsx";
import DevelopmentControl from "../pages/buildingControl/BuildingControl";
import InDevelopment from "../pages/inDevelopment/InDevelopment.jsx";
import Profile from "../pages/profile/Profile.jsx";
import Activity from "../pages/activity/Activity.jsx";
import OfficeSetting from "../pages/officeSetting/OfficeSetting.jsx";
import Chat from "../pages/chat/chat.jsx";
import LoggedWrapper from "./LoggedWrapper.jsx";

function MainRoutes() {
	const navigate = useNavigate();
	const { currentUser } = useSelector((state) => state.user);
	const { theme } = useSelector((state) => state.app);
	// console.log(currentUser);

	useEffect(() => {
		setThemeColor(theme);
	}, [theme]);

	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
		} else {
			navigate("/")
		}
		// return () => {};
	}, [currentUser]);

	return (
		<>
			{currentUser ? (
				<>
					<LoggedWrapper />
				</>
			) : (
				<>
					<Routes>
						{/* LOGIN PAGE */}
						<Route path="/login">
							<Route
								index
								// element={!currentUser ? <LoginPage /> : <Navigate to="/" />}
								element={<LoginPage />}
							/>
						</Route>
					</Routes>
				</>
			)}
		</>
	);
}

export default MainRoutes;
