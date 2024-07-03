import "./documentView.css"
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
import DocumentViewer from "../../components/documentViewer/DocumentViewer";
import PlanBill from "../../components/planBill/PlanBill";
import GenerateBill from "../../components/generateBill/GenerateBill";
import PlanInfoCard from "../../components/planInfoCard/PlanInfoCard";

export default function DocumentView() {
	const [rightBarView, setRightBarView] = useState(1);

  return (
		<>
			<div className="pageWrapper"></div>

			<Header />
			<div className="documentViewContainer">
				<SideBar />
				<MiddleBar
					style={{ background: "transparent" }}
					topBarData={{
						action: "Survey Plan",
						planNumber: "Plan Number",
					}}>
					<DocumentViewer />
				</MiddleBar>

				<RightBar>
					{rightBarView !== 1 ? (
						<Activities setRightBarView={setRightBarView} />
						) : (
						<Document setRightBarView={setRightBarView} />
					)}
				</RightBar>
			</div>
		</>
	);
}
