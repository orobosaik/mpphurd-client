import FeedBackground from "../../components/feedBackground/FeedBackground";
import FeedCard from "../../components/feedCard/FeedCard";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import CreateApplication from "../createApplication/CreateApplication";
import "./home.css";

export default function Home() {
	return (
		<>
			<div className="pageWrapper"></div>
			<Header />
			<div className="homeContainer">
				<SideBar />
				<FeedBackground>
					<FeedCard
						count={24}
						title={"Create New Application"}
						office={"Clearing"}
						route={"/permit/new"}
					/>
					<FeedCard count={44} title={"Payment made"} office={"Assessment"} />
					<FeedCard count={7} title={"Minuted Files"} office={"Assessment"} />
				</FeedBackground>
			</div>
		</>
	);
}
