import FeedBackground from "../../components/feedBackground/FeedBackground";
import FeedCard from "../../components/feedCard/FeedCard";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import "./home.css";

export const Home = () => {
	return (
		<>
			<Header />
			<div className="homeContainer">
				<SideBar />
				<FeedBackground>
					<FeedCard
						count={24}
						title={"Awaiting Assessment"}
						office={"Assessment"}
					/>
					<FeedCard
						count={44}
						title={"Payment made"}
						office={"Assessment"}
					/>
					<FeedCard
						count={7}
						title={"Minuted Files"}
						office={"Assessment"}
					/>
				</FeedBackground>
			</div>
		</>
	);
};
