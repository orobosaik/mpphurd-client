import "./createBill.css";
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
import { useLocation } from "react-router-dom";

export default function CreateBill() {
	const [rightBarView, setRightBarView] = useState(0);
	const {state} = useLocation()
	const data = state.data;

	return (
		<>
			<div className="pageWrapper"></div>

			<Header />
			<div className="planContainer">
				<SideBar selected={"home"} />
				<MiddleBar
					topBarData={{
						action: "Create New Bill",
						planNumber: data?.planNumber
							? `${data?.dev.region.substring(0, 3).toUpperCase()}/${
									data?.planNumber.value
							  }/${new Date(data?.planNumber.date).getFullYear()}`
							: data?.uniqueId,
					}}>
					<GenerateBill />
				</MiddleBar>

				<RightBar>
					{!rightBarView === 1 ? (
						<Activities setRightBarView={setRightBarView} />
					) : (
						<Document setRightBarView={setRightBarView} />
					)}
				</RightBar>
			</div>
		</>
	);
}
