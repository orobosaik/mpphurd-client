import "./plan.css";
import FeedBackground from "../../components/feedBackground/FeedBackground";
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

export default function Plan() {
	const [rightBarView, setRightBarView] = useState(0);
	const [viewBills, setViewBills] = useState("");

	return (
		<>
			<Header />
			<div className="planContainer">
				<SideBar />
				<MiddleBar
					topBarData={
						viewBills === "viewBills"
							? "View Bills"
							: viewBills === "generateBill"
							? "Generate Bill"
							: "Plan Info"
					}>
					{viewBills === "viewBills" ? (
						<PlanBill />
					) : viewBills === "generateBill" ? (
						<GenerateBill />
					) : (
						<PlanInfo setViewBills={setViewBills} />
					)}
				</MiddleBar>

				<RightBar>
					{rightBarView === 1 ? (
						<Document setRightBarView={setRightBarView} />
					) : (
						<Activities setRightBarView={setRightBarView} />
					)}
				</RightBar>
			</div>
		</>
	);
}
