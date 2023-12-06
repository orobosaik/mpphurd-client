import "./adminRegionList.css";
import MiddleBar from "../../../components/middleBar/MiddleBar";
import ListWrapper from "../../../components/listWrapper/ListWrapper";
import AdminHeader from "../../../components/adminHeader/AdminHeader";
import AdminSideBar from "../../../components/adminSideBar/AdminSideBar";
import ListCardContainer from "../../../components/listCardContainer/ListCardContainer";
import ListCard from "../../../components/listCard/ListCard";
import { ExpandMoreRounded, PersonAddRounded } from "@mui/icons-material";
import AdminStaffListCard from "../../../components/adminStaffListCard/AdminStaffListCard";
import { Link } from "react-router-dom";
import AdminStaffEditModal from "../../../components/adminStaffEditModal/AdminStaffEditModal";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { getThemeColor } from "../../../utilities/themeColor";
import AdminOfficeEditModal from "../../../components/adminOfficeEditModal/AdminOfficeEditModal";
import AdminRegionEditModal from "../../../components/adminRegionEditModal/AdminRegionEditModal";

export default function AdminRegionList() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	const themeColor = getThemeColor();
	const [reload, setReload] = useState();

	useEffect(() => {
		const getData = async () => {
			try {
				let host = import.meta.env.VITE_SERVER;
				const res = await axios.get(`${host}/admin/region`);

				setData(res.data);
				setIsLoading(false);
				console.log(res.data);
			} catch (error) {
				let message = error.response
					? error.response.data.message
					: error.message;
				console.log(error);
				console.log(message);

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

	return (
		<>
			<div className="pageWrapper"></div>

			<div className="Office">
				<AdminHeader />
				<div className="OfficeWrapper">
					<div className="OfficeSideBar">
						<AdminSideBar selected={"office"} />
					</div>

					<div className="OfficeMiddleBar">
						<MiddleBar
							topBarData={{
								action: "Region List",
								options: (
									<AdminRegionEditModal
										// buttonIcon={<PersonAddRounded />}
										buttonClass={"addStaffButton primary"}
										buttonName={"Add New Region"}
										setReload={setReload}
										modalType={"add"}
									/>
								),
							}}>
							{isLoading && (
								<div className="loading-container">
									<CircularProgress
										thickness={3}
										size={55}
										className="loading-icon"
									/>
								</div>
							)}
							{data && (
								<>
									{/* LIST QUERY */}
									<div className="listQuery">
										<div className="listQueryOptions">
											<span>STATUS: </span>
											<select name="listQueryOption" id="listQueryOption">
												<option value="active" selected>
													Active
												</option>
												<option value="inactive">Inactive</option>
											</select>
										</div>

										<div>
											<input type="text" placeholder="Search list..." />
										</div>

										<div className="listCount">
											<span>Count:</span>
											<span>{data.length}</span>
										</div>

										<div className="listSort">
											<span>Latest to Oldest</span>
											<ExpandMoreRounded />
										</div>
									</div>

									{/* LIST HEADER */}
									<div className="adminStaffListHeader">
										<span className="adminRegionListHeader__code"> Code</span>
										<span className="adminRegionListHeader__name">Name</span>
										<span className="adminRegionListHeader__zones">Zones</span>

										<span className="adminRegionListHeader__status">
											Status
										</span>
										<span className="adminRegionListHeader__edit">Edit</span>
									</div>

									{/* LIST CARD */}
									<div className="adminStaffListCardWrapper">
										{data.length < 1 ? <p className="nodatacurrently">No Data Currently</p>:""}
										{data.map((d) => {
											return (
												<div className=" adminOfficeListCard">
													<div className="adminRegionListCard__code">
														{d?.code.toUpperCase() || ""}{" "}
													</div>
													<div className="adminRegionListCard__name">
														{d?.name}
													</div>
													<div className="adminRegionListCard__zones">
														{" "}
														{d.zones.join(",   ")}
													</div>
													<div
														className={
															d.isActive
																? "adminRegionListCard__status active"
																: "adminRegionListCard__status inactive"
														}>
														{d.isActive ? "Active" : "Inactive"}{" "}
													</div>

													<div className="adminRegionListCard__edit">
														<AdminRegionEditModal
															// buttonIcon={<PersonAddRounded />}
															// buttonClass={"adminOfficeListCardEditButton"}
															data={d}
															setReload={setReload}
															buttonName={"Edit"}
															modalType={"edit"}
														/>
													</div>
												</div>
											);
										})}
									</div>
								</>
							)}
						</MiddleBar>
						<ToastContainer />
					</div>
				</div>
			</div>
		</>
	);
}
