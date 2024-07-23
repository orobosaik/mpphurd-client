import "./adminStaffList.css";
import MiddleBar from "../../../components/middleBar/MiddleBar";
import ListWrapper from "../../../components/listWrapper/ListWrapper";
import AdminHeader from "../../../components/adminHeader/AdminHeader";
import AdminSideBar from "../../../components/adminSideBar/AdminSideBar";
import ListCardContainer from "../../../components/listCardContainer/ListCardContainer";
import ListCard from "../../../components/listCard/ListCard";
import {
	CloseRounded,
	ExpandLessRounded,
	ExpandMoreRounded,
	PersonAddRounded,
} from "@mui/icons-material";
import AdminStaffListCard from "../../../components/adminStaffListCard/AdminStaffListCard";
import { Link } from "react-router-dom";
import AdminStaffEditModal from "../../../components/adminStaffEditModal/AdminStaffEditModal";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { getThemeColor } from "../../../utilities/themeColor";
import LoadingIcon from "../../../utilities/LoadingIcon";
import { JOB_TITLE_LIST } from "../../../utilities/appData";
import Fuse from "fuse.js";

export default function AdminStaffList() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const themeColor = getThemeColor();
	const [searchQuery, setSearchQuery] = useState("");
	const [searchData, setSearchData] = useState([]);
	const [status, setStatus] = useState("null");
	const [designation, setDesignation] = useState("all");

	const [sortReverse, setSortReverse] = useState(false);

	const [reload, setReload] = useState();

	useEffect(() => {
		const getData = async () => {
			try {
				let host = import.meta.env.VITE_SERVER;
				const res = await axios.get(`${host}/admin/staff`);

				setData(res.data);
				setFilteredData(res.data);
				setIsLoading(false);
				// console.log(res.data);
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
			"firstName",
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
								action: "Staff List",
								options: (
									<AdminStaffEditModal
										buttonIcon={<PersonAddRounded />}
										buttonClass={"addStaffButton primary"}
										buttonName={"Add New Staff"}
										setReload={setReload}
										modalType={"new"}
									/>
									// <Link to="./new">
									// 	<button className="addStaffButton primary">
									// 		<PersonAddRounded className="icon" />
									// 		<span>Add New Staff</span>
									// 	</button>
									// </Link>
								),
							}}>
							{/* <ListWrapper></ListWrapper> */}

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
												console.log(statusVal);
												console.log(designationVal);
												console.log(data);
												console.log(filteredData);

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
										<span>Designation: </span>
										<select
											name="listQueryOption"
											id="listQueryOption"
											defaultValue="all"
											onChange={(e) => {
												const designationVal = e.target.value;
												const statusValBol = status === "true" ? true : false;
												console.log(status);
												console.log(designationVal);
												console.log(data);
												console.log(filteredData);

												setDesignation(designationVal);

												let newData;
												if (designationVal !== "all") {
													newData = data.filter(
														(d) => d.jobTitle === designationVal
													);
													console.log("NOT IN ALL");
													console.log(newData);
												} else {
													newData = data;
													console.log("IN ALL");
													console.log(newData);
												}

												if (status !== "null") {
													newData = newData.filter(
														(d) => d.isActive === statusValBol
													);
												}

												setFilteredData(newData);
											}}>
											<option value="all">All</option>
											{JOB_TITLE_LIST.map((job) => {
												return <option value={job}>{job}</option>;
											})}
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
										{!searchQuery && <span>{filteredData?.length || "0"}</span>}
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
									<span className="adminStaffListHeader__avatar">Photo</span>

									<span className="adminStaffListHeader__name">
										{" "}
										Name/Email
									</span>
									{/* <span className="adminStaffListHeader__email">Email</span> */}
									<span className="adminStaffListHeader__phone">Phone</span>
									<span className="adminStaffListHeader__region">Region</span>
									<span className="adminStaffListHeader__office">Office</span>
									<span className="adminStaffListHeader__designation">
										Designation
									</span>
									<span className="adminStaffListHeader__status">Status</span>
								</div>

								<div className="adminStaffListCardWrapper">
									{searchQuery && (
										<div className="searchHeader">
											<p>Search Results</p>
										</div>
									)}

									{isLoading && <LoadingIcon />}
									{!isLoading && !searchQuery && (
										<AdminStaffListCard data={filteredData} />
									)}
									{!isLoading && searchQuery && (
										<AdminStaffListCard data={searchData} />
									)}
									{!isLoading && filteredData.length < 1 && (
										<div className="adminStaffListCardWrapperFlex">
											<p>No Data Found</p>
										</div>
									)}
								</div>
							</>
						</MiddleBar>
					</div>
				</div>
			</div>
		</>
	);
}
