import "./header.css";
import { Email, Notifications, Search } from "@mui/icons-material";

export default function Header() {
	return (
		<div className="headerContainer">
			<div className="headerLeft">
				<span className="headerLogo">
					<p>MPPHURD</p>
				</span>
			</div>
			<div className="headerCenter">
				<div className="searchBar">
					<Search />
					<input
						type="text"
						placeholder="Start typing to search"
						className="searchInput"
					/>
				</div>
			</div>
			<div className="headerRight">
				<div className="headerLinks">
					<span className="headerLink">Approval</span>
					<span className="headerLink">Petition</span>
					<span className="headerLink">B.Control</span>
				</div>
				<div className="headerIcons">
					<div className="headerIconItem">
						<Email />
						<span className="headerIconBadge">3</span>
					</div>
					<div className="headerIconItem">
						<Notifications />
						<span className="headerIconBadge">1</span>
					</div>
				</div>
				<img src="/assets/persons/headshot1.jpg" alt="" />
			</div>
		</div>
	);
}
