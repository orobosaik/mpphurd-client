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
import AdminStaffUpdate from "../pages/admin/adminStaffUpdate/AdminStaffUpdate";



function AdminRoutes() {
	const { currentAdmin, loading } = useSelector((state) => state.admin);
	return (
		<>

			<Routes>
				{/* HOME PAGE */}
				<Route path="/admin">
					<Route
						index
						element={!currentAdmin ? <Navigate to="/admin/login" /> : <AdminHome />}
					/>
				</Route>

				{/* LOGIN PAGE */}
				<Route path="/admin/login">
					<Route
						index
						element={!currentAdmin ? <AdminLogin /> : <Navigate to="/admin" />}
					/>
				</Route>

				{/* PERMIT | APPROVAL */}
				<Route path="/admin/staff">
					<Route index element={<AdminStaffList />} />
					<Route path="new" element={<AdminStaffUpdate />} />
					<Route path="planId">
						<Route index element={<Plan />} />
						<Route path="bills" element={<ViewBill />} />
						<Route path="createbill" element={<CreateBill />} />
						<Route path="minute" element={<Minute />} />
					</Route>
				</Route>

				{/* PETITION */}
				<Route path="/admin/petition">
					<Route index element={<Petition />} />
				</Route>

				{/* BUILDING CONTROL */}
				<Route path="/admin/control">
					<Route index element={<BuildingControl />} />
				</Route>

				{/* OFFICE */}
				<Route path="/admin/office">
					<Route index element={<Office />} />
				</Route>

				{/* ACTIVITIES */}
				<Route path="/admin/activities">
					<Route index element={<ActivitiesView />} />
				</Route>
				{/* ANALYSIS */}
				<Route path="/admin/analysis">
					<Route index element={<Analysis />} />
				</Route>
			</Routes>
		</>
	);
}


export default AdminRoutes;
