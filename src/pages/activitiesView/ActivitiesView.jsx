import "./activitiesView.css";
import FeedBackground from "../../components/feedBackground/FeedBackground";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";

export default function ActivitiesView() {
	return (
		<>
			<div className="pageWrapper"></div>

			<Header />
			<div className="homeContainer">
				<SideBar />
				<FeedBackground></FeedBackground>
			</div>
		</>
	);
}
