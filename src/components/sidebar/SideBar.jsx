import "./sideBar.css";
import { NavLink } from "react-router-dom";
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
					<li>
						<NavLink className="sideBarListItem" to="/view">
							<HomeRounded className="sideBarIcon" />
							<span className="sideBarListItemText ">Home</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/office">
							<LibraryBooksRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Office</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/activities">
							<AssessmentRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Activities</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/analysis">
							<QueryStatsRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Analysis</span>
						</NavLink>
					</li>
				</ul>
			</div>
		</div>
	);
}
