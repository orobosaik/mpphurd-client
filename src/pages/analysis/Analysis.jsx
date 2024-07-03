import "./analysis.css";
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
import uuid from "react-uuid";
import LoadingIcon from "../../utilities/LoadingIcon";

import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";

const chartSetting = {
	xAxis: [
		{
			label: "Count",
		},
	],
	width: 700,
	height: 400,
};

const dataset = [
	{
		london: 59,
		paris: 57,
		newYork: 86,
		Actions: 21,
		month: "Jan",
	},
	{
		london: 50,
		paris: 52,
		newYork: 78,
		Actions: 28,
		month: "Feb",
	},
	{
		london: 47,
		paris: 53,
		newYork: 106,
		Actions: 41,
		month: "Mar",
	},
	{
		london: 54,
		paris: 56,
		newYork: 92,
		Actions: 73,
		month: "Apr",
	},
	{
		london: 57,
		paris: 69,
		newYork: 92,
		Actions: 99,
		month: "May",
	},
	{
		london: 60,
		paris: 63,
		newYork: 103,
		Actions: 144,
		month: "June",
	},
	{
		london: 59,
		paris: 60,
		newYork: 105,
		Actions: 319,
		month: "July",
	},
	{
		london: 65,
		paris: 60,
		newYork: 106,
		Actions: 249,
		month: "Aug",
	},
	{
		london: 51,
		paris: 51,
		newYork: 95,
		Actions: 131,
		month: "Sept",
	},
	{
		london: 60,
		paris: 65,
		newYork: 97,
		Actions: 55,
		month: "Oct",
	},
	{
		london: 67,
		paris: 64,
		newYork: 76,
		Actions: 48,
		month: "Nov",
	},
	{
		london: 61,
		paris: 70,
		newYork: 103,
		Actions: 25,
		month: "Dec",
	},
];

const valueFormatter = (value) => `${value}mm`;

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

	const [isLoading, setIsLoading] = useState(false);
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

	const [type, setType] = useState("office");
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

			// console.log("RAW:", res.data);

			setData(res.data);

			let newData;
			newData = categorizeListByDate(res.data, sortReverse, true);

			// console.log("CATEGORIZED: ", newData);
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
		// getData();
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
		action: "Analysis Breakdown",
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

					<div className="OfficeMiddleBar analysis">
						<MiddleBar topBarData={topBarDataObj}>
							{/* <ListWrapper state={data} /> */}
							<div className="">
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
											<option value="office">Office</option>
											<option value="individual">Individual</option>
										</select>
									</div>
									<div className="listQueryOptions">
										<input type="search" />
									</div>

									<div className="listQueryDate">
										<div className="listQueryDateWrapper">
											<label htmlFor="listQueryDateStart">From:</label>
											<input
												type="date"
												name="listQueryDateStart"
												id="listQueryDateStart"
												max={endDate}
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
												min={startDate}
												max={new Date().toISOString().slice(0, 10)}
												onChange={(e) => {
													// dispatch(resetOfficeData());
													setEndDate(e.target.value);
												}}
											/>
										</div>
									</div>
								</div>

								<div className={"planInfoWrapper wrapper"} ref={scrollSection}>
									{isLoading ? (
										<div className="loading">
											<LoadingIcon />
										</div>
									) : (
										<>
											{type === "office" && (
												<>
													<div className="container office">
														<div className="top">
															<span>
																{!(startDate == endDate)
																	? `${format(
																			startDate,
																			"MMMM do, yyyy"
																	  )} - ${format(endDate, "MMMM do, yyyy")}`
																	: `${format(endDate, "MMMM do, yyyy")}`}
															</span>
															<button>Print</button>
														</div>
														<h2 className="title">Plans</h2>

														<div className="section">
															<div className="figureCard">
																<span className="type">In</span>
																<span className="figure">134</span>
															</div>
															<div className="figureCard">
																<span className="type">Out</span>
																<span className="figure">91</span>
															</div>
															<div className="figureCard">
																<span className="type">Current</span>
																<span className="figure">863</span>
															</div>
														</div>
														<div className="section">
															<div className="figureCard">
																<span className="type">Cleared</span>
																<span className="figure">134</span>
															</div>
															<div className="figureCard">
																<span className="type">for rejection</span>
																<span className="figure">91</span>
															</div>
															<div className="figureCard">
																<span className="type">Issues</span>
																<span className="figure">863</span>
															</div>
														</div>
														<div className="section">
															<LineChart
																xAxis={[
																	{
																		id: "Months",
																		data: [1, 2, 3, 4, 5, 8, 10],
																	},
																]}
																series={[
																	{
																		id: "In",
																		label: "Incoming files",
																		data: [2, 5.5, 2, 8.5, 1.5, 5],
																	},
																	{
																		id: "Out",
																		label: "Outgoing files",
																		data: [12, 6.5, 12, 9.5, 11.5, 15],
																	},
																]}
																width={600}
																height={300}
															/>
														</div>

														<div className="section">
															<PieChart
																series={[
																	{
																		data: [
																			{ id: 0, value: 10, label: "Cleared" },
																			{
																				id: 1,
																				value: 5,
																				label: "For Rejection",
																			},
																			{
																				id: 2,
																				value: 25,
																				label: "With Issues",
																			},
																		],
																		innerRadius: 30,
																		outerRadius: 100,
																		paddingAngle: 5,
																		cornerRadius: 5,
																	},
																]}
																width={400}
																height={200}
															/>
															<BarChart
																xAxis={[
																	{
																		scaleType: "band",
																		data: [
																			"TP",
																			"Architect",
																			"M.Eng",
																			"S.Eng",
																			"E.Eng",
																			"Others",
																		],
																	},
																]}
																series={[
																	{
																		label: "No of Issues raised",
																		data: [4, 3, 5, 6, 9, 5],
																	},
																	// { label: "", data: [1, 6, 3] },
																	// { label: "", data: [2, 5, 6] },
																]}
																width={500}
																height={300}
																borderRadius={5}
															/>
														</div>
													</div>
													<div className="container office">
														<h2 className="title">Actions</h2>

														<div className="section">
															<BarChart
																dataset={dataset}
																yAxis={[
																	{
																		scaleType: "band",
																		dataKey: "month",
																		color: "#fdb462",
																	},
																]}
																series={[
																	{
																		dataKey: "Actions",
																		label: "Actions",
																		valueFormatter,
																	},
																]}
																layout="horizontal"
																{...chartSetting}
															/>
														</div>
													</div>
												</>
											)}
											{type === "individual" && (
												<>
													<div className="container individual">
														<div className="top">
															<span>
																{!(startDate == endDate)
																	? `${format(
																			startDate,
																			"MMMM do, yyyy"
																	  )} - ${format(endDate, "MMMM do, yyyy")}`
																	: `${format(endDate, "MMMM do, yyyy")}`}
															</span>
															<button>Print</button>
														</div>
														<h2 className="title">Plans</h2>

														<div className="section">
															<div className="invert">
																<div className="figureCard">
																	<span className="type">Treated</span>
																	<span className="figure">134</span>
																</div>
																<div className="figureCard">
																	<span className="type">Actions</span>
																	<span className="figure">91</span>
																</div>
															</div>

															<div className="invert">
																<div className="figureCard">
																	<span className="type">Cleared</span>
																	<span className="figure">134</span>
																</div>
																<div className="figureCard">
																	<span className="type">Issues</span>
																	<span className="figure">91</span>
																</div>
															</div>

															<div className="">
																<PieChart
																	series={[
																		{
																			data: [
																				{ id: 0, value: 10, label: "Cleared" },
																				{
																					id: 1,
																					value: 5,
																					label: "For Rejection",
																				},
																				{
																					id: 2,
																					value: 25,
																					label: "With Issues",
																				},
																			],
																			innerRadius: 30,
																			outerRadius: 100,
																			paddingAngle: 5,
																			cornerRadius: 5,
																		},
																	]}
																	width={400}
																	height={200}
																/>
															</div>
														</div>
													</div>
													<div className="container individual">
														<h2 className="title">Actions</h2>

														<div className="section">
															<BarChart
																dataset={dataset}
																yAxis={[
																	{
																		scaleType: "band",
																		dataKey: "month",
																		color: "#fdb462",
																	},
																]}
																series={[
																	{
																		dataKey: "Actions",
																		label: "Actions Taken",
																		valueFormatter,
																	},
																]}
																layout="horizontal"
																{...chartSetting}
															/>
														</div>
													</div>
												</>
											)}
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
