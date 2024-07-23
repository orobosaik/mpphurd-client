import FeedBackground from "../../components/feedBackground/FeedBackground";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";

function BuildingControl() {
	return (
		<>
			<Header />
			<div className="homeContainer">
				<SideBar />
				<FeedBackground></FeedBackground>
			</div>
		</>
	);
}

export default BuildingControl;
