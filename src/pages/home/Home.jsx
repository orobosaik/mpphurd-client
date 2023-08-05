import Feed from "../../components/feed/Feed";
import FeedBackground from "../../components/feedBackground/FeedBackground";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import "./home.css"

export const Home = () => {
	return (
		<>
			<Header />
			<div className="homeContainer">
				<SideBar />
				<FeedBackground />
			</div>
		</>
	);
};
