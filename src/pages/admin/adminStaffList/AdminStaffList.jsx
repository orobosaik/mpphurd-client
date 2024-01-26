import "./adminStaffList.css";
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
import LoadingIcon from "../../../utilities/LoadingIcon";

export default function AdminStaffList() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	const themeColor = getThemeColor();

	const [reload, setReload] = useState();

	useEffect(() => {
		const getData = async () => {
			try {
				let host = import.meta.env.VITE_SERVER;
				const res = await axios.get(`${host}/admin/staff`);

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
							{isLoading && <LoadingIcon />}
							{data && (
								<>
									<div className="listQuery">
										<div className="listQueryOptions">
											<span>STATUS: </span>
											<select
												defaultValue="active"
												name="listQueryOption"
												id="listQueryOption">
												<option value="active">Active</option>
												<option value="inactive">Inactive</option>
											</select>
										</div>
										<div className="listQueryOptions">
											<span>REGION: </span>
											<select name="listQueryOption" id="listQueryOption">
												<option value="incoming">Benin</option>
												{/* <option value="Outgoing">Outgoing</option>
												<option value="current">Current</option> */}
											</select>
										</div>
										<div className="listQueryOptions">
											<span>DESIGNATION: </span>
											<select name="listQueryOption" id="listQueryOption">
												{/* <option value="incoming">Incoming</option>
												<option value="Outgoing">Outgoing</option>
												<option value="current">Current</option>
												<option value="current">Current</option>
												<option value="current">Current</option>
												<option value="current">Current</option>
												<option value="current">Current</option> */}
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

									<div className="adminStaffListHeader">
										<span className="adminStaffListHeader__avatar">Photo</span>

										<span className="adminStaffListHeader__name"> Name</span>
										<span className="adminStaffListHeader__email">Email</span>
										<span className="adminStaffListHeader__phone">Phone</span>
										<span className="adminStaffListHeader__region">Region</span>
										<span className="adminStaffListHeader__office">Office</span>
										<span className="adminStaffListHeader__designation">
											Designation
										</span>
										<span className="adminStaffListHeader__status">Status</span>
									</div>

									<div className="adminStaffListCardWrapper">
										<AdminStaffListCard data={data} />
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
