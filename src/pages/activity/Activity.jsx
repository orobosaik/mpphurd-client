import "./activity.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import MiddleBar from "../../components/middleBar/MiddleBar";
import ApplicationForm from "../../components/applicationForm/ApplicationForm";
import ListWrapper from "../../components/listWrapper/ListWrapper";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getThemeColor } from "../../utilities/themeColor";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import DropDownSelect from "../../widgets/dropDownSelect/DropDownSelect";
import { useDispatch, useSelector } from "react-redux";
import DataExportPDF from "../../widgets/dataExportPDF/DataExportPDF";
import { useReactToPrint } from "react-to-print";
import ListCard from "../../components/listCard/ListCard";
import uuid from "react-uuid";
import ListCardContainer from "../../components/listCardContainer/ListCardContainer";
import LoadingIcon from "../../utilities/LoadingIcon";

import { format } from "date-fns";
import {
	CloseRounded,
	ExpandLessRounded,
	ExpandMoreRounded,
} from "@mui/icons-material";
import { fetchInstance } from "../../utilities/fetcher";
import Fuse from "fuse.js";
import ActivityCardModal from "../../components/activityCardModal/ActivityCardModal";

export default function Activity() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { officeData } = useSelector((state) => state.app);
	const { currentUser } = useSelector((state) => state.user);

	const componentRef = useRef();
	const scrollSection = useRef();

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState();
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
	const themeColor = getThemeColor();
	const [reload, setReload] = useState();
	const [lastPlanNumber, setLastPlanNumber] = useState();

	const [type, setType] = useState("All");
	const [sortReverse, setSortReverse] = useState(false);

	const [scrollToView, setScrollToView] = useState();

	const categorizeListByDate = (data, ascending, isCurrent) => {
		if (!data) return [];

		let newArray = {};
		data.forEach((item) => {
			let date = item.createdAt?.split("T")[0];
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
		try {
			setIsLoading(true);
			const res = await fetchInstance.get(
				`/staffs/staff/${currentUser._id}/activities?type=${type}&dateFrom=${startDate}&dateTo=${endDate}`
			);

			console.log("RAW:", res.data);

			setData(res.data);

			let newData;
			newData = categorizeListByDate(res.data, sortReverse, true);

			console.log("CATEGORIZED: ", newData);
			setListArray(newData);

			// Update officeData on every change in listArray
			// dispatch(
			// 	setOfficeData({
			// 		active: true,
			// 		type,
			// 		data: res.data,
			// 		listArray: newData,
			// 		startDate,
			// 		endDate,
			// 		searchQuery,
			// 		searchResult,
			// 		searchData,
			// 		sort: sortReverse,
			// 	})
			// );

			// const size =
			// 	encodeURI(JSON.stringify(listArray)).split(/%..|./).length - 1;
			// console.log(size / 1024);
		} catch (error) {
			// dispatch(resetOfficeData());
			setListArray([]);
			setData([]);
			let message = error.response
				? error.response.data.message
				: error.message;
			// console.log(error);
			// console.log(message);

			setTimeout(() => {
				toast.error(message, {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: themeColor,
				});
			}, 0);
			// setTimeout(() => {
			// }, 2000);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		// if (officeData.active) {
		// 	// console.log("Redux OFFICEDATA:", officeData);
		// 	setData(officeData.data);
		// 	setType(officeData.type);
		// 	setListArray(officeData.listArray);
		// 	setStartDate(officeData.startDate);
		// 	setEndDate(officeData.endDate);
		// 	setSearchQuery(officeData.searchQuery);
		// 	setSearchResult(officeData.searchResult);
		// 	setScrollToView(() => []);
		// 	setIsLoading(false);
		// } else {
		// 	getData();
		// }
		getData();
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
			"type",
			"title",
			"by.office",
			"by.staff",
			"comment.status",
			"comment.text",
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

		setSearchResult(categorizeListByDate(items, sortReverse, false));
	}, [searchQuery]);

	let topBarDataObj = {
		action: "Staff Activities",
		// action: data.id.name + " Office",

		// planNumber: "BC/1212/2023",
	};

	return (
		<>
			<div className="pageWrapper"></div>
			<div className="Office">
				<Header />
				<div className="OfficeWrapper">
					<div className="OfficeSideBar">
						<SideBar selected={"office"} />
					</div>

					<div className="OfficeMiddleBar">
						<MiddleBar topBarData={topBarDataObj}>
							{/* <ListWrapper state={data} /> */}
							<div className="activity">
								<div className=" filter listQuery">
									<div className="listQueryOptions">
										<select
											className="secondary"
											name="listQueryOption"
											id="listQueryOption"
											defaultValue={type}
											onChange={(e) => {
												// dispatch(resetOfficeData());
												setType(e.target.value);
											}}>
											<option value="All">All</option>
											<option value="Minute">Minutes</option>
											<option value="Action">Actions</option>
											<option value="Vetting">Vetting</option>
										</select>
									</div>

									<div className="listQueryDate">
										<div className="listQueryDateWrapper">
											<label htmlFor="listQueryDateStart">From:</label>
											<input
												type="date"
												name="listQueryDateStart"
												id="listQueryDateStart"
												value={startDate}
												onChange={(e) => {
													// dispatch(resetOfficeData());
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
													// dispatch(resetOfficeData());
													setEndDate(e.target.value);
												}}
											/>
										</div>
									</div>

									<div className="querySearchBar">
										<input
											value={searchQuery}
											onChange={(e) => {
												setSearchQuery(e.target.value);
											}}
											type="text"
											placeholder={`Search loaded record...`}
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
												categorizeListByDate(data, !sortReverse, false)
											);
										}}>
										<span>{!sortReverse ? "New to Old" : "Old to New"}</span>
										{!sortReverse ? (
											<ExpandMoreRounded />
										) : (
											<ExpandLessRounded />
										)}
									</div>
								</div>

								{/* <div className="planInfoWrapper list">
									<div className="item">
										<span className="tag Vetting">Action</span>
										<span className="time">23:21, 23/12/2023</span>
										<span className="planNo">2312/2034</span>
										<span className="status">Issue Raised</span>
										<span>|</span>
										<span className="title">FastTrack Bill Created</span>
										<span>|</span>
										<span className="office">In Assessment</span>
										<span>|</span>
										<span className="office">By Orobosa Ikponmwosa</span>
										<span className="expand">Expand</span>
									</div>
								</div> */}

								<div
									className={
										!searchQuery
											? "planInfoWrapper wrapper"
											: "planInfoWrapper wrapper Search"
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
												<div className="empty">
													<p>No Data Found...</p>
												</div>
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
																	// <ListCard
																	// 	key={uuid()}
																	// 	data={item}
																	// 	type={type}
																	// 	officeState={{
																	// 		active: true,
																	// 		type,
																	// 		data,
																	// 		listArray,
																	// 		startDate,
																	// 		endDate,
																	// 		searchQuery,
																	// 		searchResult,
																	// 		searchData,
																	// 		sort: sortReverse,
																	// 	}}
																	// 	scrollSection={scrollSection}
																	// />

																	<div className="item" key={i}>
																		<span className={`tag ${item.type}`}>
																			{item.type}
																		</span>
																		<span className="time">
																			{format(item.createdAt, "dd-MM-yyyy")}
																			{` | ${format(item.createdAt, "HH:mm")}`}
																		</span>
																		<span
																			className="planNo"
																			onClick={() => {
																				navigate(`/permit/${item?.plan?._id}`);
																			}}>
																			{item?.plan?.planNumber?.fullValue ||
																				item?.plan?.uniqueId}
																		</span>
																		<span className="status">
																			{item.comment.status}
																		</span>
																		<span>|</span>
																		<span className="title">{item.title}</span>
																		<span>|</span>
																		<span className="office">
																			{item?.by?.officeId
																				? `By ${item.by.office}`
																				: item?.from?.officeId
																				? `from ${item.from.office}`
																				: item?.through?.officeId
																				? `through ${item.through.office}`
																				: ""}
																		</span>
																		<span>|</span>
																		<span className="office">
																			{currentUser._id === item?.by?.staffId
																				? `By ${item.by.staff}`
																				: currentUser._id ===
																				  item?.from?.staffId
																				? `from ${item.from.staff}`
																				: item?.through?.staffId ===
																				  currentUser._id
																				? `through ${item.through.staff}`
																				: ""}
																		</span>
																		{
																			<ActivityCardModal
																				className={"expand"}
																				buttonText={"Expand"}
																				stateData={item}
																			/>
																		}
																	</div>
																);
															})}
														</ListCardContainer>
													);
												})}

											{searchQuery &&
												searchResult?.map((arr, index) => {
													return (
														<ListCardContainer
															key={index}
															date={arr.date}
															count={arr.items.length}>
															{arr.items.toReversed().map((item, i) => {
																return (
																	// <ListCard
																	// 	key={uuid()}
																	// 	data={item}
																	// 	type={type}
																	// 	officeState={{
																	// 		active: true,
																	// 		type,
																	// 		data,
																	// 		listArray,
																	// 		startDate,
																	// 		endDate,
																	// 		searchQuery,
																	// 		searchResult,
																	// 		searchData,
																	// 		sort: sortReverse,
																	// 	}}
																	// 	scrollSection={scrollSection}
																	// />

																	<div className="item" key={i}>
																		<span className={`tag ${item.type}`}>
																			{item.type}
																		</span>
																		<span className="time">
																			23:21, 23/12/2023
																		</span>
																		<span className="planNo">
																			{item?.plan?.planNumber?.fullValue ||
																				item?.plan?.uniqueId}
																		</span>
																		<span className="status">Issue Raised</span>
																		<span>|</span>
																		<span className="title">
																			FastTrack Bill Created
																		</span>
																		<span>|</span>
																		<span className="office">
																			{item?.by?.officeId
																				? `By ${item.by.office}`
																				: item?.from?.officeId
																				? `from ${item.from.office}`
																				: item?.through?.officeId
																				? `through ${item.through.office}`
																				: ""}
																		</span>
																		<span>|</span>
																		<span className="office">
																			{currentUser._id === item?.by?.staffId
																				? `By ${item.by.staff}`
																				: currentUser._id ===
																				  item?.from?.staffId
																				? `from ${item.from.staff}`
																				: item?.through?.staffId ===
																				  currentUser._id
																				? `through ${item.through.staff}`
																				: ""}
																		</span>
																		<span className="expand">Expand</span>
																	</div>
																);
															})}
														</ListCardContainer>
													);
												})}
										</>
									)}
								</div>
							</div>
						</MiddleBar>
					</div>
				</div>
			</div>
		</>
	);
}
