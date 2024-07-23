import "./adminOfficeList.css";
import MiddleBar from "../../../components/middleBar/MiddleBar";
import ListWrapper from "../../../components/listWrapper/ListWrapper";
import AdminHeader from "../../../components/adminHeader/AdminHeader";
import AdminSideBar from "../../../components/adminSideBar/AdminSideBar";
import ListCardContainer from "../../../components/listCardContainer/ListCardContainer";
import ListCard from "../../../components/listCard/ListCard";
import {
	AddCard,
	AddRounded,
	CloseRounded,
	ExpandLessRounded,
	ExpandMoreRounded,
	PersonAddRounded,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import AdminOfficeEditModal from "../../../components/adminOfficeEditModal/AdminOfficeEditModal";
import { getThemeColor } from "../../../utilities/themeColor";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingIcon from "../../../utilities/LoadingIcon";
import { getFullName } from "../../../utilities/getFullName";
import AdminStaffView from "../adminStaffView/adminStaffView";
import { CircularProgress } from "@mui/material";
import { JOB_TITLE_LIST } from "../../../utilities/appData";
import Fuse from "fuse.js";

export default function AdminOfficeList() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState();
	const [filteredData, setFilteredData] = useState([]);
	const [staff, setStaff] = useState([]);
	const [region, setRegion] = useState([]);
	const themeColor = getThemeColor();
	const [reload, setReload] = useState();

	const [searchQuery, setSearchQuery] = useState("");
	const [searchData, setSearchData] = useState([]);
	const [status, setStatus] = useState("null");
	const [designation, setDesignation] = useState("all");

	const [sortReverse, setSortReverse] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const getData = async () => {
			try {
				let host = import.meta.env.VITE_SERVER;

				const res = await Promise.all([
					axios.get(`${host}/admin/office`),
					axios.get(`${host}/admin/staff`),
					axios.get(`${host}/admin/region`),
				]);

				setData(res[0].data);
				setFilteredData(res[0].data)
				setStaff(res[1].data);
				setRegion(res[2].data);
				setIsLoading(false);

				// console.log(res[0].data);
				// console.log(res[1].data);
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
				setIsLoading(false);
			}
		};

		getData();

		// return () => {
		// 	second
		// }
	}, [reload]);

	const todayDate = new Date().toISOString().slice(0, 10);

	// CREATE SEARCH FUNCTIONALITY WITH FUSE JS
	const options = {
		includeScore: true,
		includeMatches: true,
		threshold: 0.2,
		keys: [
			"name",
			"middleName",
			"lastName",
			"gender",
			"jobTitle",
			"position",
			"region.name",
			["office.name"],
			"isActive",
		],
	};

	useEffect(() => {
		// console.log("DATA WHILE IN SEARCH", data);
		// If the user searched for an empty string,
		// display all data.
		if (searchQuery.length === 0) {
			setSearchData([]);
			return;
		}


		const fuse = new Fuse(filteredData, options);
		const results = fuse.search(searchQuery);
		const items = results.map((result) => result.item);
		// console.log("FUSE SEARCH: ", results);
		// console.log("FUSE SEARCH MAPPED: ", items);
		setSearchData(items);
	}, [searchQuery]);

	return (
		<>
			<div className="Office">
				<AdminHeader />
				<div className="OfficeWrapper">
					<div className="OfficeSideBar">
						<AdminSideBar selected={"office"} />
					</div>

					<div className="OfficeMiddleBar">
						<MiddleBar
							topBarData={{
								action: "Office List",
								options: (
									<AdminOfficeEditModal
										modalType={"add"}
										buttonIcon={<AddRounded />}
										buttonClass={"addStaffButton primary"}
										buttonName={"Create Office"}
										setReload={setReload}
										region={region}
									/>
								),
							}}>
							{isLoading && <LoadingIcon />}
							{data && (
								<>
									<div className="listQuery">
										<div className="listQueryOptions">
											<span>Status: </span>
											<select
												defaultValue="null"
												name="listQueryOption"
												id="listQueryOption"
												onChange={(e) => {
													const statusVal = e.target.value;
													const statusValBol =
														statusVal === "true" ? true : false;
													const designationVal = designation;

													setStatus(statusVal);

													let newData;
													if (statusVal === "null") {
														newData = data;
													} else {
														newData = data.filter(
															(d) => d.isActive === statusValBol
														);
													}

													if (designationVal !== "all") {
														newData = newData.filter(
															(d) => d.jobTitle === designationVal
														);
													}

													setFilteredData(newData);

													if (searchQuery) {
														setSearchQuery(()=> searchQuery)
													}

												}}>
												<option value="null">All</option>
												<option value="true">Active</option>
												<option value="false">Inactive</option>
											</select>
										</div>
										{/* <div className="listQueryOptions">
											<span>REGION: </span>
											<select name="listQueryOption" id="listQueryOption">
												<option value="incoming">Benin</option>
											</select>
										</div> */}
										<div className="listQueryOptions">
											<span>Region: </span>
											<select
												name="listQueryOption"
												id="listQueryOption"
												defaultValue="all">
												<option value="all">All</option>
												<option value="benin">Benin</option>
												{/* {JOB_TITLE_LIST.map((job) => {
													return <option value={job}>{job}</option>;
												})} */}
											</select>
										</div>

										<div className="querySearchBar">
											<input
												value={searchQuery}
												onChange={(e) => {
													setSearchQuery(e.target.value);
												}}
												type="text"
												placeholder={`Search list...`}
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
											{!searchQuery && (
												<span>{filteredData?.length || "0"}</span>
											)}
											{searchQuery && <span>{searchData?.length || "0"}</span>}
										</div>

										<div
											className="listSort"
											onClick={() => {
												setSortReverse(!sortReverse);
												setFilteredData(filteredData?.toReversed());
												setSearchData(searchData?.toReversed());
											}}>
											<span>{!sortReverse ? "New to Old" : "Old to New"}</span>
											{!sortReverse ? (
												<ExpandMoreRounded />
											) : (
												<ExpandLessRounded />
											)}
										</div>
									</div>

									<div className="adminStaffListHeader">
										<span className="adminOfficeListHeader__name"> Name</span>
										<span className="adminOfficeListHeader__staff">Staff</span>
										<span className="adminOfficeListHeader__tasks">Tasks</span>
										<span className="adminOfficeListHeader__region">
											Region
										</span>
										<span className="adminOfficeListHeader__status">
											Status
										</span>
										<span className="adminOfficeListHeader__edit">Edit</span>
									</div>

									{/* <div className="adminStaffListCardWrapper">
										{data.map((d) => {
											return (
												<div className=" adminOfficeListCard" key={d._id}>
													<div className="adminOfficeListCard__name">
														{d.name}
													</div>

													<div className="adminOfficeListCard__staff">
														{staff
															.filter((s) =>
																s.office.some(
																	(office) => office?.id?._id === d?._id
																)
															)
															.map((s, i) => (
																<span
																	key={i}
																	onClick={() => {
																		navigate("/staffs/staff", {
																			state: { data: s },
																		});
																	}}>
																	{[
																		s.title,
																		s.firstName,
																		s.middleName,
																		s.lastName,
																		s.prefix,
																	]
																		.filter(
																			(value) =>
																				value != null &&
																				value !== "" &&
																				value !== undefined
																		)
																		.join(" ")}
																</span>
															))}
													</div>
													<div className="adminOfficeListCard__tasks">
														{d.tasks.map((word) => {
															let wordsArray = word.split(" ");
															let capitalizedArray = wordsArray.map(
																(word) =>
																	word.charAt(0).toUpperCase() + word.slice(1)
															);
															return capitalizedArray.join(" ");
														})}
													</div>
													<div className="adminOfficeListCard__region">
														{d?.region?.name}
													</div>
													<div
														className={
															d.isActive
																? "adminOfficeListCard__status active"
																: "adminOfficeListCard__status inactive"
														}>
														{d.isActive ? "Active" : "Inactive"}
													</div>

													<div className="adminOfficeListCard__edit">
														<AdminOfficeEditModal
															className="adminOfficeListCardEditButton"
															buttonName={"Edit"}
															modalType={"edit"}
															setReload={setReload}
															data={d}
															staff={staff}
															region={region}
														/>
													</div>
												</div>
											);
										})}
									</div> */}

									<div className="adminStaffListCardWrapper">
										{searchQuery && (
											<div className="searchHeader">
												<p>Search Results</p>
											</div>
										)}
										{isLoading && <LoadingIcon />}
										{!isLoading &&
											!searchQuery &&
											filteredData.map((d) => {
												return (
													<div className=" adminOfficeListCard" key={d._id}>
														<div className="adminOfficeListCard__name">
															{d.name}
														</div>

														<div className="adminOfficeListCard__staff">
															{staff
																.filter((s) =>
																	s.office.some(
																		(office) => office?.id?._id === d?._id
																	)
																)
																.map((s, i) => (
																	<span
																		key={i}
																		onClick={() => {
																			navigate("/staffs/staff", {
																				state: { data: s },
																			});
																		}}>
																		{[
																			s.title,
																			s.firstName,
																			s.middleName,
																			s.lastName,
																			s.prefix,
																		]
																			.filter(
																				(value) =>
																					value != null &&
																					value !== "" &&
																					value !== undefined
																			)
																			.join(" ")}
																	</span>
																))}
														</div>
														<div className="adminOfficeListCard__tasks">
															{d.tasks.map((word) => {
																let wordsArray = word.split(" ");
																let capitalizedArray = wordsArray.map(
																	(word) =>
																		word.charAt(0).toUpperCase() + word.slice(1)
																);
																return capitalizedArray.join(" ");
															})}
														</div>
														<div className="adminOfficeListCard__region">
															{d?.region?.name}
														</div>
														<div
															className={
																d.isActive
																	? "adminOfficeListCard__status active"
																	: "adminOfficeListCard__status inactive"
															}>
															{d.isActive ? "Active" : "Inactive"}
														</div>

														<div className="adminOfficeListCard__edit">
															<AdminOfficeEditModal
																className="adminOfficeListCardEditButton"
																buttonName={"Edit"}
																modalType={"edit"}
																setReload={setReload}
																data={d}
																staff={staff}
																region={region}
															/>
														</div>
													</div>
												);
											})}
										{!isLoading &&
											searchQuery &&
											searchData.map((d) => {
												return (
													<div className=" adminOfficeListCard" key={d._id}>
														<div className="adminOfficeListCard__name">
															{d.name}
														</div>

														<div className="adminOfficeListCard__staff">
															{staff
																.filter((s) =>
																	s.office.some(
																		(office) => office?.id?._id === d?._id
																	)
																)
																.map((s, i) => (
																	<span
																		key={i}
																		onClick={() => {
																			navigate("/staffs/staff", {
																				state: { data: s },
																			});
																		}}>
																		{[
																			s.title,
																			s.firstName,
																			s.middleName,
																			s.lastName,
																			s.prefix,
																		]
																			.filter(
																				(value) =>
																					value != null &&
																					value !== "" &&
																					value !== undefined
																			)
																			.join(" ")}
																	</span>
																))}
														</div>
														<div className="adminOfficeListCard__tasks">
															{d.tasks.map((word) => {
																let wordsArray = word.split(" ");
																let capitalizedArray = wordsArray.map(
																	(word) =>
																		word.charAt(0).toUpperCase() + word.slice(1)
																);
																return capitalizedArray.join(" ");
															})}
														</div>
														<div className="adminOfficeListCard__region">
															{d?.region?.name}
														</div>
														<div
															className={
																d.isActive
																	? "adminOfficeListCard__status active"
																	: "adminOfficeListCard__status inactive"
															}>
															{d.isActive ? "Active" : "Inactive"}
														</div>

														<div className="adminOfficeListCard__edit">
															<AdminOfficeEditModal
																className="adminOfficeListCardEditButton"
																buttonName={"Edit"}
																modalType={"edit"}
																setReload={setReload}
																data={d}
																staff={staff}
																region={region}
															/>
														</div>
													</div>
												);
											})}

										{!isLoading && filteredData.length < 1 && (
											<div className="adminStaffListCardWrapperFlex">
												<p>No Data Found</p>
											</div>
										)}
									</div>
								</>
							)}
						</MiddleBar>
					</div>
				</div>
			</div>
		</>
	);
}
