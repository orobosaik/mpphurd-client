import "./sideBar.css"
import { ArticleRounded, AssessmentRounded, HomeRounded, LibraryBooksRounded, QueryStatsRounded } from "@mui/icons-material"

export default function SideBar () {
  return (
		<div className="sideBar">
			<div className="sideBarWrapper">
				<ul className="sideBarList">
					<li className="sideBarListItem selected">
						<HomeRounded className="sideBarIcon" />
						<span className="sideBarListItemText ">Home</span>
					</li>
					<li className="sideBarListItem">
						<LibraryBooksRounded className="sideBarIcon" />
						<span className="sideBarListItemText">Office</span>
					</li>
					<li className="sideBarListItem">
						<AssessmentRounded className="sideBarIcon" />
						<span className="sideBarListItemText">Activities</span>
					</li>
					<li className="sideBarListItem">
						<QueryStatsRounded className="sideBarIcon" />
						<span className="sideBarListItemText">Analysis</span>
					</li>
				</ul>
			</div>
		</div>
	);
}
