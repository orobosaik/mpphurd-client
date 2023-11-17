import "./header.css";
import { Link } from "react-router-dom";
import {
	CloseRounded,
	Email,
	Notifications,
	Search,
} from "@mui/icons-material";
import ThemeChanger from "../../widgets/themeChanger/ThemeChanger";
import { useState } from "react";
import SearchResult from "../searchResult/SearchResult";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";

export default function Header() {
	const [searchQuery, setSearchQuery] = useState("");
	const [open, setOpen] = useState(false);

	const handleSearchInput = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleClickedAway = () => {
		setOpen(false);
	};

	return (
		<div className="headerContainer">
			<div className="headerLeft">
				<Link to="/">
					<span className="headerLogo">
						<img src="/assets/logos/Logo-Mpphurd.png" alt="" />
						<div></div>
						<p>MPPHURD</p>
					</span>
				</Link>
			</div>
			<div className="headerCenter">
				<ClickAwayListener onClickAway={handleClickedAway}>
					<div className="searchBar">
						<label htmlFor="headerSearchInput">
							<Search className="searchIcon" />
						</label>
						<input
							id="headerSearchInput"
							type="text"
							placeholder="Start typing to search"
							className="searchInput"
							onChange={(e) => handleSearchInput(e)}
							onFocus={() => setOpen(true)}
							value={searchQuery}
						/>
						{searchQuery && (
							<div className="searchBarCloseButton" onClick={() => setSearchQuery("")}>
								{" "}
								<CloseRounded />
							</div>
						)}
						{searchQuery && open && <SearchResult />}
					</div>
				</ClickAwayListener>
			</div>
			<div className="headerRight">
				<div className="headerLinks">
					<ThemeChanger />

					{/* <Link to="/permit">
						<span className="headerLink active">Approval</span>
					</Link>
					<span className="headerLink">Petition</span>
					<span className="headerLink">B.Control</span> */}
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
