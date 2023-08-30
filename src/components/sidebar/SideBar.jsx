import "./sideBar.css";
import { NavLink } from "react-router-dom";
import {
	ArticleRounded,
	AssessmentRounded,
	AssignmentLateRounded,
	HomeRounded,
	LibraryBooksRounded,
	LogoutRounded,
	PolicyRounded,
	QueryStatsRounded,
	TaskRounded,
} from "@mui/icons-material";

export default function SideBar({ selected }) {
	return (
		<div className="sideBar">
			<div className="sideBarWrapper">
				<ul className="sideBarList">
					<li>
						<NavLink className="sideBarListItem" to="/">
							<HomeRounded className="sideBarIcon" />
							<span className="sideBarListItemText ">Home</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/permit">
							<TaskRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Approval</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/petition">
							<AssignmentLateRounded className="sideBarIcon" />
							<span className="sideBarListItemText">Petition</span>
						</NavLink>
					</li>
					<li>
						<NavLink className="sideBarListItem" to="/control" >
							<PolicyRounded className="sideBarIcon" />
							<span className="sideBarListItemText">B.Control</span>
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
				<div className="sideBarLogout">
					<LogoutRounded className="sideBarIcon" />
					<span>Log Out</span>
				</div>
			</div>
		</div>
	);
}
