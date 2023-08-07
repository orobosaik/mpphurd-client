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

export default function Plan() {
	return (
		<>
			<Header />
			<div className="planContainer">
				<SideBar />
				<MiddleBar>
					<PlanInfo />
				</MiddleBar>

				<RightBar>
					<Document/>
				</RightBar>
			</div>
		</>
	);
}
