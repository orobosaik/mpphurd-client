import "./createApplication.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import RightBar from "../../components/rightbar/RightBar";
import MiddleBar from "../../components/middleBar/MiddleBar";
import PlanInfo from "../../components/planInfo/PlanInfo";
import FeedCard from "../../components/feedCard/FeedCard";
import Activities from "../../components/activities/Activities";
import Document from "../../components/document/Document";
import { useState } from "react";
import TopBar from "../../components/topBar/TopBar";
import PlanBill from "../../components/planBill/PlanBill";
import GenerateBill from "../../components/generateBill/GenerateBill";
import FeedBackground from "../../components/feedBackground/FeedBackground";
import ApplicationForm from "../../components/applicationForm/ApplicationForm";

export default function CreateApplication() {
	const [rightBarView, setRightBarView] = useState(0);
	const [viewBills, setViewBills] = useState("generateBill");
	return (
		<>
			<div className="createApplication">
				<Header />
				<div className="createApplicationWrapper">
					<div className="createApplicationSideBar">
						<SideBar />
					</div>

					<div className="createApplicationMiddleBar">
						<MiddleBar
							topBarData={{
								action: "Create New Application",
								planNumber: "BC/1212/2023",
							}}>
							<ApplicationForm />
						</MiddleBar>
					</div>
				</div>
			</div>
		</>
	);
}
