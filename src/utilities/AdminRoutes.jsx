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
import AdminLogin from "../pages/admin/adminLogin/adminLogin";
import AdminHome from "../pages/admin/adminHome/AdminHome";
import { useSelector } from "react-redux";
import AdminStaffList from "../pages/admin/adminStaffList/AdminStaffList";
import AdminStaffView from "../pages/admin/adminStaffView/adminStaffView";
import AdminOfficeList from "../pages/admin/adminOfficeList/AdminOfficeList";
import AdminOfficeView from "../pages/admin/adminOfficeView/AdminOfficeView";
import { setThemeColor } from "./themeColor";
import AdminRegionList from "../pages/admin/adminRegionList/AdminRegionList.jsx";
import DocumentView from "../pages/documentView/DocumentView.jsx";
import AdminPlan from "../pages/admin/adminPlan/AdminPlan.jsx";
import AdminViewBill from "../pages/admin/adminViewBill/AdminViewBill.jsx";
import AdminInDevelopment from "../pages/admin/adminInDevelopment/AdminInDevelopment.jsx";

function AdminRoutes() {
	const { currentAdmin } = useSelector((state) => state.admin);

	const navigate = useNavigate();

	const { theme } = useSelector((state) => state.app);
	// console.log(currentAdmin);

	useEffect(() => {
		setThemeColor(theme);
	}, [theme]);

	useEffect(() => {
			if (!currentAdmin) {
				navigate("/login");
			}
	}, [currentAdmin]);

	return (
		<>
			{currentAdmin ? (
				<Routes>
					{/* HOME PAGE */}
					<Route path="/">
						<Route
							index
							// element={!currentAdmin ? <Navigate to="/login" /> : <AdminHome />}
							element={<AdminHome />}
						/>
					</Route>

					{/* LOGIN PAGE */}
					<Route path="/login">
						<Route
							index
							// element={!currentAdmin ? <AdminLogin /> : <Navigate to="/" />}
							element={<AdminLogin />}
						/>
					</Route>

					{/* PERMIT | APPROVAL */}
					<Route path="/permit">
						<Route path="new" element={<CreateApplication />} />
						<Route path=":id">
							<Route index element={<AdminPlan />} />
							<Route path="bills" element={<AdminViewBill />} />
							{/* <Route path="minute" element={<Minute />} /> */}
							<Route path="documents" element={<DocumentView />} />
						</Route>
						<Route path="office">
							<Route path=":id" element={<Office />} />
						</Route>
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
					<Route path="/regions">
						<Route index element={<AdminRegionList />} />
					</Route>

					{/* BUILDING CONTROL */}
					<Route path="/permit">
						<Route index element={<AdminInDevelopment />} />
					</Route>

					{/* OFFICE */}
					<Route path="/public">
						<Route index element={<AdminInDevelopment />} />
					</Route>

					{/* ACTIVITIES */}
					<Route path="/activities">
						<Route index element={<AdminInDevelopment />} />
					</Route>
					{/* ANALYSIS */}
					<Route path="/analysis">
						<Route index element={<AdminInDevelopment />} />
					</Route>
				</Routes>
			) : (
				<AdminLogin />
			)}
		</>
	);
}

export default AdminRoutes;
