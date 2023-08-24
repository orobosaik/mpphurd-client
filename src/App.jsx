import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Home } from "./pages/home/Home";
import Plan from "./pages/plan/Plan.jsx";
import CreateApplication from "./pages/createApplication/CreateApplication";
import Office from "./pages/office/Office";
import Minute from "./pages/minute/Minute";
import CreateBill from "./pages/createBill/CreateBill";
import ViewBill from "./pages/viewBill/ViewBill";
import ActivitiesView from "./pages/activitiesView/ActivitiesView";
import Analysis from "./pages/analysis/Analysis";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/view">
					<Route index element={<Home />} />
					<Route path="new" element={<CreateApplication />} />
					<Route path="office" element={<Office />} />
					<Route path="planId">
						<Route index element={<Plan />} />
						<Route path="bills" element={<ViewBill />} />
						<Route path="createbill" element={<CreateBill />} />
						<Route path="minute" element={<Minute />} />
					</Route>
				</Route>

				<Route path="/office">
					<Route index element={<Office />} />
				</Route>
				<Route path="/activities">
					<Route index element={<ActivitiesView />} />
				</Route>
				<Route path="/analysis">
					<Route index element={<Analysis />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
