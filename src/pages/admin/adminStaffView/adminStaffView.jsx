import "./adminStaffView.css";
import { useEffect, useState } from "react";
import {
	AddPhotoAlternateRounded,
	FileUploadRounded,
	Image,
	UploadFileRounded,
} from "@mui/icons-material";
import ToggleSwitch from "../../../components/toggleSwitch/ToggleSwitch";
import MiddleBar from "../../../components/middleBar/MiddleBar";
import ListWrapper from "../../../components/listWrapper/ListWrapper";
import AdminHeader from "../../../components/adminHeader/AdminHeader";
import AdminSideBar from "../../../components/adminSideBar/AdminSideBar";
import ListCardContainer from "../../../components/listCardContainer/ListCardContainer";
import ListCard from "../../../components/listCard/ListCard";
import { ExpandMoreRounded, PersonAddRounded } from "@mui/icons-material";
import AdminStaffListCard from "../../../components/adminStaffListCard/AdminStaffListCard";
import { Link, useLocation } from "react-router-dom";
import AdminStaffEditModal from "../../../components/adminStaffEditModal/AdminStaffEditModal";
import { getThemeColor } from "../../../utilities/themeColor";

export default function AdminStaffView() {
	const [isActive, setIsActive] = useState(true);
	const [isManagement, setIsManagement] = useState(false);
	const location = useLocation();

	const [isLoading, setIsLoading] = useState(true);
	// const [data, setData] = useState(null);
	const themeColor = getThemeColor();

	const data = location.state;
	console.log("IN IN IN ", data);

	// useEffect(() => {
	// 	const getData = async () => {
	// 		try {
	// 			let host = import.meta.env.VITE_SERVER;
	// 			const res = await axios.get(`${host}/admin/staff/${}`);

	// 			setData(res.data);
	// 			setIsLoading(false);
	// 			console.log(res.data);
	// 		} catch (error) {
	// 			let message = error.response
	// 				? error.response.data.message
	// 				: error.message;
	// 			console.log(error);
	// 			console.log(message);

	// 			setTimeout(() => {
	// 				toast.error(message, {
	// 					position: "top-right",
	// 					autoClose: 2000,
	// 					hideProgressBar: false,
	// 					closeOnClick: true,
	// 					pauseOnHover: true,
	// 					draggable: true,
	// 					progress: undefined,
	// 					theme: themeColor,
	// 				});
	// 			}, 0);
	// 			setIsLoading(false);
	// 		}
	// 	};

	// 	getData();

	// 	// return () => {
	// 	// 	second
	// 	// }
	// }, []);

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
								action: "Staff View",
								options: (
									<AdminStaffEditModal
										buttonIcon={<PersonAddRounded />}
										buttonClass={"addStaffButton primary"}
										buttonName={"Update Staff"}
									/>
								),
							}}>
							<div className="staffView">
								<div className="staffViewHeader">
									<div>
										<h2>
											{data.middleName
												? data.firstName +
												  " " +
												  data.middleName +
												  " " +
												  data.lastName
												: data.firstName + " " + data.lastName}
										</h2>

										<h4>{data.jobTitle.fullName}</h4>
										<h4>TPO2 (Zone 2)</h4>

										<p>Department of Development Control+</p>

										<div>
											<span>Official Email:</span>
											<span>{data.email}</span>
										</div>
										<div>
											<span>Alt Email:</span>
											<span>{data.email1}</span>
										</div>
										<div>
											<span>Phone:</span>
											<span>{data.phone}</span>
										</div>
										<div>
											<span>Gender:</span>
											<span>{data.gender}</span>
										</div>
									</div>

									<div className="staffImage">
										<label
											htmlFor={"staffMeansOfIdentification"}
											className="uploadImageWrapper">
											<img
												src={
													data.profilePicture || import.meta.env.VITE_NO_AVATAR
												}
												alt="photo"
											/>
										</label>
									</div>
								</div>

								<div className="inputStaffHeaderRight">
									<div>
										<span>Active Status:</span>
										<ToggleSwitch
											toggled={data.isActive}
											label={"isActive"}
											onClick={setIsActive}
										/>
									</div>
									<div>
										<span>Management Staff:</span>
										<ToggleSwitch
											toggled={data.isManagement}
											label={"isManagement"}
											onClick={setIsManagement}
										/>
									</div>
								</div>
							</div>
						</MiddleBar>
					</div>
				</div>
			</div>
		</>
	);
}
