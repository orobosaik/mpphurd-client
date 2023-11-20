import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

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
import AdminLogin from "../pages/admin/adminLogin/adminLogin";
import AdminHome from "../pages/admin/adminHome/AdminHome";
import { useSelector } from "react-redux";
import AdminStaffList from "../pages/admin/adminStaffList/AdminStaffList";
import AdminStaffView from "../pages/admin/adminStaffView/adminStaffView";
import AdminOfficeList from "../pages/admin/adminOfficeList/AdminOfficeList";
import AdminOfficeView from "../pages/admin/adminOfficeView/AdminOfficeView";

function AdminRoutes() {
	const { currentAdmin, loading } = useSelector((state) => state.admin);
	return (
		<>
			<Routes>
				{/* HOME PAGE */}
				<Route path="/">
					<Route
						index
						element={!currentAdmin ? <Navigate to="/login" /> : <AdminHome />}
					/>
				</Route>

				{/* LOGIN PAGE */}
				<Route path="/login">
					<Route
						index
						element={!currentAdmin ? <AdminLogin /> : <Navigate to="/" />}
					/>
				</Route>

				{/* STAFF */}
				<Route path="/staffs">
					<Route index element={<AdminStaffList />} />
					{/* <Route path="new" element={<AdminStaffUpdate />} /> */}
					<Route path="staff">
						<Route index element={<AdminStaffView />} />
						<Route path="bills" element={<ViewBill />} />
						<Route path="createbill" element={<CreateBill />} />
						<Route path="minute" element={<Minute />} />
					</Route>
				</Route>

				{/* OFFICE */}
				<Route path="/offices">
					<Route index element={<AdminOfficeList />} />
					{/* <Route path="new" element={<AdminStaffUpdate />} /> */}
					<Route path="office">
						<Route index element={<AdminOfficeView />} />
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
				<Route path="/offices">
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
