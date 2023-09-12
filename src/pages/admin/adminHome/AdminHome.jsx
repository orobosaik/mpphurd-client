import AdminHeader from "../../../components/adminHeader/AdminHeader";
import AdminSideBar from "../../../components/adminSideBar/AdminSideBar";
import FeedBackground from "../../../components/feedBackground/FeedBackground";
import FeedCard from "../../../components/feedCard/FeedCard";
import Header from "../../../components/header/Header";
import SideBar from "../../../components/sidebar/SideBar";
import CreateApplication from "../../createApplication/CreateApplication";
import "./adminHome.css";

export default function AdminHome() {
	return (
		<>
			<div className="pageWrapper"></div>
			<AdminHeader />
			<div className="homeContainer">
				<AdminSideBar />
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
