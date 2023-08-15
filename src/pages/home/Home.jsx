import Feed from "../../components/feed/Feed";
import FeedBackground from "../../components/feedBackground/FeedBackground";
import FeedCard from "../../components/feedCard/FeedCard";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import "./home.css"

export const Home = () => {
	return (
		<>
			<Header />
			<div className="homeContainer">
				<SideBar />
				<FeedBackground>
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
				</FeedBackground>
			</div>
		</>
	);
};
