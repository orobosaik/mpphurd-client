import "./sideBar.css";
import {
	ArticleRounded,
	AssessmentRounded,
	HomeRounded,
	LibraryBooksRounded,
	QueryStatsRounded,
} from "@mui/icons-material";

export default function SideBar({ selected }) {
	return (
		<div className="sideBar">
			<div className="sideBarWrapper">
				<ul className="sideBarList">
					<li
						className={
							selected === "home"
								? "selected sideBarListItem"
								: "sideBarListItem"
						}>
						<HomeRounded className="sideBarIcon" />
						<span className="sideBarListItemText ">Home</span>
					</li>
					<li
						className={
							selected === "office"
								? "selected sideBarListItem"
								: "sideBarListItem"
						}>
						<LibraryBooksRounded className="sideBarIcon" />
						<span className="sideBarListItemText">Office</span>
					</li>
					<li
						className={
							selected === "activities"
								? "selected sideBarListItem"
								: "sideBarListItem"
						}>
						<AssessmentRounded className="sideBarIcon" />
						<span className="sideBarListItemText">Activities</span>
					</li>
					<li
						className={
							selected === "analysis"
								? "selected sideBarListItem"
								: "sideBarListItem"
						}>
						<QueryStatsRounded className="sideBarIcon" />
						<span className="sideBarListItemText">Analysis</span>
					</li>
				</ul>
			</div>
		</div>
	);
}
