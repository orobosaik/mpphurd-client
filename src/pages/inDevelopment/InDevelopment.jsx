import FeedBackground from "../../components/feedBackground/FeedBackground";
import FeedbackModal from "../../components/feedbackModal/FeedbackModal";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import "./inDevelopment.css";

export default function InDevelopment() {
	return (
		<>
			<div className="pageWrapper"></div>

			<Header />
			<div className="homeContainer">
				<SideBar />
				<FeedBackground>
					<div className="inDevelopmentText">In Progress...</div>
				</FeedBackground>
			</div>
		</>
	);
}
