import "./header.css";
import { Email, Notifications, Search } from "@mui/icons-material";

export default function Header() {
	return (
		<div className="headerContainer">
			<div className="headerLeft">
				<span className="headerLogo">
					<img src="/assets/logos/Logo-Mpphurd.png" alt="" />
					<div></div>
					<p>MPPHURD</p>
				</span>
			</div>
			<div className="headerCenter">
				<div className="searchBar">
					<Search className="searchIcon" />
					<input
						type="text"
						placeholder="Start typing to search"
						className="searchInput"
					/>
				</div>
			</div>
			<div className="headerRight">
				<div className="headerLinks">
					<span className="headerLink active">Approval</span>
					<span className="headerLink">Petition</span>
					<span className="headerLink">B.Control</span>
				</div>
				<div className="headerIcons">
					<div className="headerIconItem">
						<Notifications className="notificationIcon" />
						<span className="headerIconBadge">3</span>
					</div>
					<div className="headerIconItem">
						<Email className="emailIcon" />
						<span className="headerIconBadge">5</span>
					</div>
				</div>
				<div className="headerUser">
					<div className="headerDetails">
						<span className="headerName">Orobosa</span>
						<span className="headerOffice">(Records)</span>
					</div>

					<img
						src="/assets/persons/headshot1.jpg"
						alt=""
						className="headerImg"
					/>
				</div>
			</div>
		</div>
	);
}
