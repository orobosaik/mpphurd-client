import "./newApplication.css";
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

export default function NewApplication() {
	const [rightBarView, setRightBarView] = useState(0);
	const [viewBills, setViewBills] = useState("generateBill");
	return (
		<>
			<div className="newApplication">
				<Header />
				<div className="newApplicationWrapper">
					<div className="newApplicationSideBar">
						<SideBar />
					</div>

					<div className="newApplicationMiddleBar">
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
					</div>
				</div>
			</div>
		</>
	);
}
