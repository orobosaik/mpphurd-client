import FeedBackground from "../../components/feedBackground/FeedBackground";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import RightBar from "../../components/rightbar/RightBar";
import "./plan.css";
import MiddleBar from "../../components/middleBar/MiddleBar";
import PlanInfo from "../../components/planInfo/PlanInfo";
import FeedCard from "../../components/feedCard/FeedCard";
import Activities from "../../components/activities/Activities";
import Document from "../../components/document/Document";
import { useState } from "react";
import TopBar from "../../components/topBar/TopBar";
import ViewBill from "../../components/viewBill/ViewBill";

export default function Plan() {
	const [rightBarView, setRightBarView] = useState(0);
	const [billView, setBillView] = useState(0);

	return (
		<>
			<Header />
			<div className="planContainer">
				<SideBar />
				<MiddleBar>
					{billView === 1 ? (
						<ViewBill />
					) : (
						<PlanInfo setBillView={setBillView} />
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
