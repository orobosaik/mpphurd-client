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
import { socket } from "./socket.js";
import Settings from "../pages/settings/Settings.jsx";

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
			socket.auth = { userId: currentUser._id };
			socket.connect();
		}
		// return () => {};
	}, []);

	return (
		<>
			{currentUser ? (
				<>
					<Routes>
						{/* HOME PAGE */}
						<Route path="/">
							<Route
								index
								// element={!currentUser ? <Navigate to="/login" /> : <Home />}
								element={<Home />}
							/>
						</Route>

						{/* PERMIT | APPROVAL */}
						<Route path="/permit">
							{/* <Route index element={currentUser && <Approval />} /> */}
							<Route index element={<OfficeSelect />} />

							<Route path="new" element={<CreateApplication />} />
							<Route path=":id">
								<Route index element={<Plan />} />
								<Route path="bills" element={<ViewBill />} />
								<Route path="create_bill" element={<CreateBill />} />
								<Route path="minute" element={<Minute />} />
								<Route path="documents" element={<DocumentView />} />
							</Route>
							<Route path="office">
								<Route path=":id" element={<Office />} />
							</Route>
						</Route>

						{/* PETITION */}
						<Route path="/petition">
							<Route index element={<InDevelopment />} />
						</Route>

						{/* BUILDING CONTROL */}
						<Route path="/b_control">
							{/* <Route index element={<BuildingControl />} /> */}
							<Route index element={<InDevelopment />} />
						</Route>

						{/* DEVELOPMENT CONTROL */}
						<Route path="/d_control">
							{/* <Route index element={<DevelopmentControl />} /> */}
							<Route index element={<InDevelopment />} />
						</Route>

						{/* ACTIVITIES */}
						<Route path="/activities">
							{/* <Route index element={<ActivitiesView />} /> */}
							<Route index element={<Activity />} />
						</Route>
						{/* ANALYSIS */}
						<Route path="/analysis">
							{/* <Route index element={<Analysis />} /> */}
							<Route index element={<Analysis />} />
						</Route>

						{/* SETTINGS */}
						<Route path="/settings">
							<Route index element={<Settings />} />

							<Route path="new" element={<CreateApplication />} />
							<Route path=":id">
								<Route index element={<Plan />} />
								<Route path="bills" element={<ViewBill />} />
								<Route path="create_bill" element={<CreateBill />} />
								<Route path="minute" element={<Minute />} />
								<Route path="documents" element={<DocumentView />} />
							</Route>
							<Route path="office">
								<Route path=":id" element={<Office />} />
							</Route>
						</Route>

						{/* PROFILE */}
						<Route path="/profile">
							<Route index element={<Profile />} />

							<Route path="new" element={<CreateApplication />} />
							<Route path=":id">
								<Route index element={<Plan />} />
								<Route path="bills" element={<ViewBill />} />
								<Route path="create_bill" element={<CreateBill />} />
								<Route path="minute" element={<Minute />} />
								<Route path="documents" element={<DocumentView />} />
							</Route>
							<Route path="office">
								<Route path=":id" element={<Office />} />
							</Route>
						</Route>

						{/* OFFICE SETTING */}
						<Route path="/office_setting">
							<Route index element={<OfficeSetting />} />

							<Route path="new" element={<CreateApplication />} />
							<Route path=":id">
								<Route index element={<Plan />} />
								<Route path="bills" element={<ViewBill />} />
								<Route path="create_bill" element={<CreateBill />} />
								<Route path="minute" element={<Minute />} />
								<Route path="documents" element={<DocumentView />} />
							</Route>
							<Route path="office">
								<Route path=":id" element={<Office />} />
							</Route>
						</Route>

						{/* CHAT  */}
						<Route path="/chat">
							<Route index element={<Chat />} />

							<Route path="new" element={<CreateApplication />} />
							<Route path=":id">
								<Route index element={<Plan />} />
								<Route path="bills" element={<ViewBill />} />
								<Route path="create_bill" element={<CreateBill />} />
								<Route path="minute" element={<Minute />} />
								<Route path="documents" element={<DocumentView />} />
							</Route>
							<Route path="office">
								<Route path=":id" element={<Office />} />
							</Route>
						</Route>

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
			) : (
				<>
					<LoginPage />
				</>
			)}
		</>
	);
}

export default MainRoutes;
