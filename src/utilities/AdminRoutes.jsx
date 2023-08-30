import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminHome from "../pages/admin/home/Home";


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

function AdminRoutes() {
	return (
		<>
			<Routes>
				{/* HOME PAGE */}
				{/* <Route path="/" element={<Navigate to="/home" />} /> */}
				<Route path="/">
					<Route index element={<Home />} />
				</Route>

				{/* PERMIT | APPROVAL */}
				<Route path="/permit">
					<Route index element={<Approval />} />
					<Route path="new" element={<CreateApplication />} />
					<Route path="planId">
						<Route index element={<Plan />} />
						<Route path="bills" element={<ViewBill />} />
						<Route path="createbill" element={<CreateBill />} />
						<Route path="minute" element={<Minute />} />
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
		</>
	);
}


export default AdminRoutes;
