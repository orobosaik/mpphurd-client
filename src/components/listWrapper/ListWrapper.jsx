import { useEffect, useRef, useState } from "react";
import "./listWrapper.css";
import ListCard from "../listCard/ListCard";
import {
	CloseRounded,
	ExpandLessRounded,
	ExpandMoreRounded,
} from "@mui/icons-material";
import ListCardContainer from "../listCardContainer/ListCardContainer";
import { useLocation } from "react-router-dom";
import { getThemeColor } from "../../utilities/themeColor";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingIcon from "../../utilities/LoadingIcon";
import { useDispatch, useSelector } from "react-redux";
import appSlice, { resetOfficeData, setOfficeData } from "../../redux/appSlice";
import Fuse from "fuse.js";
import uuid from "react-uuid";

function ListWrapper({ children }) {
	const { officeData } = useSelector((state) => state.app);
	const [showQueryDate, setShowQueryDate] = useState(true);

	const [type, setType] = useState(officeData.type || "current");

	const [listArray, setListArray] = useState([]);
	const [endDate, setEndDate] = useState(
		officeData.endDate || new Date().toISOString().slice(0, 10)
	);
	const [startDate, setStartDate] = useState(
		officeData.startDate ||
			new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
	);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [searchData, setSearchData] = useState([]);

	const dispatch = useDispatch();
	const location = useLocation();
	const state = location.state;

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState();
	const [sortReverse, setSortReverse] = useState(false);
	const [staff, setStaff] = useState([]);
	const themeColor = getThemeColor();
	const [scrollToView, setScrollToView] = useState();
	const [reload, setReload] = useState();
	const [scroll, setScroll] = useState();

	const scrollSection = useRef();

	// // Check if Plan is in User Office(s)
	// const isInUserOffice = currentUser.office.some((e) => {
	// 	return data.currentOffice?.id?._id === e?.id?._id;
	// });

	const categorizeListByDate = (data, ascending, isCurrent) => {
		if (!data) return [];

		let newArray = {};
		data.forEach((item) => {
			let date = isCurrent
				? item.currentOffice?.date?.split("T")[0]
				: item.minuteDate?.split("T")[0];
			if (newArray[date]) {
				newArray[date].items.push(item);
			} else {
				newArray[date] = { date: date, items: [item] };
			}
		});

		let sortedArray;
		if (ascending) {
			sortedArray = Object.values(newArray).sort(
				(a, b) => new Date(a.date) - new Date(b.date)
			);
		} else {
			sortedArray = Object.values(newArray).sort(
				(a, b) => new Date(b.date) - new Date(a.date)
			);
		}

		return sortedArray;
	};

	const getData = async () => {
		axios.defaults.withCredentials = true;
		try {
			let host = import.meta.env.VITE_SERVER;
			let res;

			if (type !== "current") {
				res = await axios.get(
					`${host}/staffs/office/${state.id._id}/${type}?dateFrom=${startDate}&dateTo=${endDate}`,
					{
						withCredentials: true,
					}
				);
			} else {
				res = await axios.get(`${host}/staffs/office/${state.id._id}/${type}`, {
					withCredentials: true,
				});
			}

			setIsLoading(false);
			// console.log("RAW:", res.data);

			setData(res.data);

			let newData;
			if (type === "current") {
				newData = categorizeListByDate(res.data, sortReverse, true);
			} else {
				newData = categorizeListByDate(res.data, sortReverse, false);
			}
			// console.log("CATEGORIZED: ", newData);
			setListArray(newData);

			// Update officeData on every change in listArray
			dispatch(
				setOfficeData({
					active: true,
					type,
					data: res.data,
					listArray: newData,
					startDate,
					endDate,
					searchQuery,
					searchResult,
					searchData,
					sort: sortReverse,
				})
			);

			// const size =
			// 	encodeURI(JSON.stringify(listArray)).split(/%..|./).length - 1;
			// console.log(size / 1024);
		} catch (error) {
			let message = error.response
				? error.response.data.message
				: error.message;
			// console.log(error);
			// console.log(message);

			setTimeout(() => {
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
			}, 0);
			setTimeout(() => {
				setIsLoading(false);
			}, 4000);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		if (officeData.active) {
			// console.log("Redux OFFICEDATA:", officeData);
			setData(officeData.data);
			setType(officeData.type);
			setListArray(officeData.listArray);
			setStartDate(officeData.startDate);
			setEndDate(officeData.endDate);
			setSearchQuery(officeData.searchQuery);
			setSearchResult(officeData.searchResult);
			setScrollToView(() => []);
			setIsLoading(false);
		} else {
			getData();
		}

		// return () => {
		// 	second
		// }
	}, [type, endDate, startDate]);


	useEffect(() => {
		if (officeData.scroll) {
			scrollSection.current.scrollTo({
				top: officeData.scroll,
				// behavior: "smooth",
			});
		}
	}, [scrollToView]);

	// CREATE SEARCH FUNCTIONALITY WITH FUSE JS
	const options = {
		includeScore: true,
		includeMatches: true,
		threshold: 0.2,
		keys: [
			"uniqueId",
			"planNumber.value",
			"planNumber.fullValue",
			"applicant.name",
			"applicant.email",
			"applicant.phone",
			"rep.name",
			"rep.phone",
			"dev.address",
			"dev.plotNo",
			"dev.name",
			"dev.type",
			"dev.use",
			"dev.lga",
		],
	};

	useEffect(() => {
		// console.log("DATA WHILE IN SEARCH", data);
		// If the user searched for an empty string,
		// display all data.
		if (searchQuery.length === 0) {
			setSearchResult(null);
			return;
		}

		const fuse = new Fuse(data, options);
		const results = fuse.search(searchQuery);
		const items = results.map((result) => result.item);
		// console.log("FUSE SEARCH: ", results);
		// console.log("FUSE SEARCH MAPPED: ", items);
		setSearchData(items);

		if (type === "current") {
			setSearchResult(categorizeListByDate(items, sortReverse, true));
		} else {
			setSearchResult(categorizeListByDate(items, sortReverse, false));
		}
	}, [searchQuery]);

	return (
		<div className="listWrapper">
			<div className="listQuery">
				<div className="listQueryOptions">
					<select
						name="listQueryOption"
						id="listQueryOption"
						defaultValue={type}
						onChange={(e) => {
							dispatch(resetOfficeData());
							setType(e.target.value);
						}}>
						<option value="current">Current</option>
						<option value="incoming">Incoming</option>
						<option value="Outgoing">Outgoing</option>
					</select>
				</div>

				{type !== "current" && (
					<div className="listQueryDate">
						<div className="listQueryDateWrapper">
							<label htmlFor="listQueryDateStart">From:</label>
							<input
								type="date"
								name="listQueryDateStart"
								id="listQueryDateStart"
								value={startDate}
								onChange={(e) => {
									dispatch(resetOfficeData());
									setStartDate(e.target.value);
								}}
							/>
						</div>
						<div className="listQueryDateWrapper">
							<label htmlFor="listQueryDateEnd">To:</label>
							<input
								type="date"
								name="listQueryDateEnd"
								id="listQueryDateEnd"
								value={endDate}
								onChange={(e) => {
									dispatch(resetOfficeData());
									setEndDate(e.target.value);
								}}
							/>
						</div>
					</div>
				)}

				<div className="querySearchBar">
					<input
						value={searchQuery}
						onChange={(e) => {
							setSearchQuery(e.target.value);
						}}
						type="text"
						placeholder={`Search ${state?.id?.name.toLowerCase()} record...`}
					/>
					{searchQuery && (
						<div
							className="searchBarCloseButton"
							onClick={() => setSearchQuery("")}>
							{" "}
							<CloseRounded />
						</div>
					)}
				</div>

				<div className="listCount">
					<span>Count:</span>
					{!searchQuery && <span>{data?.length || "0"}</span>}
					{searchQuery && <span>{searchData?.length || "0"}</span>}
				</div>

				<div
					className="listSort"
					onClick={() => {
						setSortReverse(!sortReverse);
						setListArray(
							categorizeListByDate(data, !sortReverse, type === "current")
						);
					}}>
					<span>{!sortReverse ? "New to Old" : "Old to New"}</span>
					{!sortReverse ? <ExpandMoreRounded /> : <ExpandLessRounded />}
				</div>
			</div>

			{searchQuery && (
				<div className="searchHeader">
					<p>Search Results</p>
				</div>
			)}
			{/* {console.log("SEARCH RESULT", searchResult)} */}

			<div className="listHeader listFormat">
				<span>PlanNo</span>
				<span>File Name</span>
				<span>Location</span>
				<span>Property Type</span>
				<span>Has Rep</span>
				<span>Zone / stk</span>
			</div>

			<div
				className={
					!searchQuery
						? "listCardContainerWrapper"
						: "listCardContainerWrapper Search"
				}
				ref={scrollSection}>
				{isLoading ? (
					<div className="loading">
						<LoadingIcon />
					</div>
				) : (
					<>
						{(listArray?.length === 0 ||
							(searchQuery && searchResult?.length === 0)) && (
							<p className="empty">No Data Found...</p>
						)}

						{!searchQuery &&
							listArray.map((arr, index) => {
								return (
									<ListCardContainer
										key={index}
										date={arr.date}
										count={arr.items.length}>
										{arr.items.toReversed().map((item, i) => {
											return (
												<ListCard
													key={uuid()}
													data={item}
													type={type}
													officeState={{
														active: true,
														type,
														data,
														listArray,
														startDate,
														endDate,
														searchQuery,
														searchResult,
														searchData,
														sort: sortReverse,
													}}
													scrollSection={scrollSection}
												/>
											);
										})}
									</ListCardContainer>
								);
							})}

						{searchQuery &&
							searchResult?.map((arr, index) => {
								return (
									<ListCardContainer
										key={uuid()}
										date={arr.date}
										count={arr.items.length}>
										{arr.items.map((item, i) => {
											return (
												<ListCard
													key={uuid()}
													data={item}
													type={type}
													officeState={{
														active: true,
														type,
														data,
														listArray,
														startDate,
														endDate,
														searchQuery,
														searchResult,
														searchData,
														sort: sortReverse,
													}}
													scrollSection={scrollSection}
												/>
											);
										})}
									</ListCardContainer>
								);
							})}
					</>
				)}
			</div>
		</div>
	);
}

export default ListWrapper;
