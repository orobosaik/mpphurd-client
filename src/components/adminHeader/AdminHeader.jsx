import "./adminHeader.css";
import { Link } from "react-router-dom";
import {
	CloseRounded,
	Email,
	Notifications,
	Search,
} from "@mui/icons-material";
import ThemeChanger from "../../widgets/themeChanger/ThemeChanger";
import { useEffect, useState } from "react";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { useDispatch, useSelector } from "react-redux";

import SearchResultCard from "../searchResultCard/SearchResultCard";
import axios from "axios";
import { LinearProgress } from "@mui/material";
import { toast } from "react-toastify";
export default function AdminHeader() {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchData, setSearchData] = useState([]);
	const [open, setOpen] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const { currentAdmin, loading } = useSelector((state) => state.admin);
	const staff = currentAdmin;

	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	const [reload, setReload] = useState();
	const [err, setErr] = useState(false);

	// useEffect(() => {
	// 	const getData = async () => {
	// 		try {
	// 			let host = import.meta.env.VITE_SERVER;
	// 			const res = await axios.get(`${host}/staffs/staff`, {
	// 				withCredentials: true,
	// 			});

	// 			setData(res.data);
	// 			setIsLoading(false);
	// 			console.log(res.data);
	// 			dispatch(loginSuccess(res.data));

	// 			console.log(res.data);
	// 		} catch (error) {
	// 			setIsLoading(false);
	// 			setErr(true);
	// 		}
	// 	};

	// 	getData();

	// 	// return () => {
	// 	// 	second
	// 	// }
	// }, [reload]);

	const handleSearchInput = (e) => {
		setIsFetching(true);
		setSearchQuery(e.target.value);
	};

	const handleClickedAway = () => {
		setOpen(false);
	};

	useEffect(() => {
		setIsFetching(true);
		const getData = async () => {
			try {
				let host = import.meta.env.VITE_SERVER;
				const res = await axios.get(
					`${host}/staffs/plan?search=${searchQuery}`,
					{
						withCredentials: true,
					}
				);
				setSearchData(res.data);
				setIsFetching(false);
				console.log("SEARCH RESULT: ", res.data);
			} catch (error) {
				let message = error.response
					? error.response.data.message
					: error.message;
				console.log(error);
				console.log(message);

				setIsFetching(false);
				toast.error(message, {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: themeColor,
				});
			}
		};

		// Function launches after 1.5 seconds (1500 ms) of the last keystroke
		// On first render you don't want to launch anything
		// Thus, you check if the user typed a query at first
		let timer = setTimeout(() => {
			if (searchQuery) getData();
		}, 1500);

		// If useEffect() relaunches, you clear the function
		// That means, the previous function won't launch
		// Thus, won't send a request to the API
		return () => clearTimeout(timer);
	}, [searchQuery]);
	return (
		<div className="admin headerContainer">
			<div className="headerLeft">
				<Link to="/">
					<span className="headerLogo">
						<img src="/assets/logos/Logo-Mpphurd.png" alt="" />
						<div></div>
						<p>MPPHURD / ADMIN</p>
					</span>
				</Link>
				<div className="headerSearch">
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
								<div
									className="searchBarCloseButton"
									onClick={() => setSearchQuery("")}>
									{" "}
									<CloseRounded />
								</div>
							)}
							{searchQuery && open && (
								<div className="searchResult">
									<header>
										{isFetching && <LinearProgress />}
										<div className="searchResultTitle">
											<h2>Search Results</h2>

											<div>
												<span>{searchData.length || 0}</span>
												<span>Found</span>
											</div>
										</div>
									</header>

									<section>
										{/* console.log(searchData) */}
										{searchData?.map((d) => {
											return (
												<SearchResultCard
													key={d._id}
													data={d}
													changeOpen={setOpen}
												/>
											);
										})}
										{searchData.length < 1 && <div>No Result Found</div>}
									</section>
								</div>
							)}
						</div>
					</ClickAwayListener>
				</div>
			</div>
			<div className="headerRight">
				<div className="headerLinks">
					{/* <button>Theme</button> */}
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
						<span className="headerName">{`${staff.firstName} ${staff.lastName}`}</span>
						<span className="headerOffice">{`${staff.jobTitle}`}</span>
					</div>

					<img
						src={staff.profilePicture || "/assets/persons/no_avatar.png"}
						alt=""
						className="headerImg"
					/>
				</div>
			</div>
		</div>
	);
}
