import "./profile.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import MiddleBar from "../../components/middleBar/MiddleBar";
import ApplicationForm from "../../components/applicationForm/ApplicationForm";
import ListWrapper from "../../components/listWrapper/ListWrapper";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getThemeColor } from "../../utilities/themeColor";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import DropDownSelect from "../../widgets/dropDownSelect/DropDownSelect";
import { useDispatch, useSelector } from "react-redux";
import DataExportPDF from "../../widgets/dataExportPDF/DataExportPDF";
import { useReactToPrint } from "react-to-print";
import ListCard from "../../components/listCard/ListCard";
import uuid from "react-uuid";
import ListCardContainer from "../../components/listCardContainer/ListCardContainer";
import { format } from "date-fns";
import { loginSuccess } from "../../redux/userSlice";
import { fetchInstance, fetchPostImage } from "../../utilities/fetcher";
import LoadingIcon from "../../utilities/LoadingIcon";

export default function Profile() {
	const dispatch = useDispatch();
	const location = useLocation();
	const data = location.state;

	const { officeData } = useSelector((state) => state.app);
	const { currentUser } = useSelector((state) => state.user);

	const componentRef = useRef();

	const [loading, setLoading] = useState(false);
	// const [isLoading, setIsLoading] = useState(true);
	// const [data, setData] = useState();
	// const [staff, setStaff] = useState([]);
	// const [region, setRegion] = useState([]);
	const theme = getThemeColor();
	const [reload, setReload] = useState();
	const [lastPlanNumber, setLastPlanNumber] = useState();
	const [photoKey, setPhotoKey] = useState(new Date());
	const [photo, setPhoto] = useState(null);
	const [photoURL, setPhotoURL] = useState(
		currentUser.profilePicture
			? `${import.meta.env.VITE_STORAGE_LINK}${currentUser.profilePicture}`
			: "/assets/persons/no_avatar.png"
	);

	const resetPhoto = () => {
		setPhoto(null);
		setPhotoURL(
			currentUser.profilePicture
				? `${import.meta.env.VITE_STORAGE_LINK}${currentUser.profilePicture}`
				: "/assets/persons/no_avatar.png"
		);
	};
	const handlePhotoChange = (e) => {
		const selectedFile = e.target.files[0];
		// console.log(selectedFile);

		if (selectedFile) {
			setPhoto(selectedFile);

			const reader = new FileReader();
			reader.onload = () => {
				setPhotoURL(reader.result);
			};
			reader.readAsDataURL(selectedFile);
		} else {
			resetPhoto();
		}
	};
	const handleSavePhoto = async () => {
		try {
			setLoading(true);

			let res;
			if (photo) {
				const formData = new FormData();
				formData.append("staffImage", photo);

				res = await fetchPostImage.put(
					`/staffs/staff/uploadProfilePicture?firstName=${currentUser.firstName}&lastName=${currentUser.lastName}`,
					formData
				);

				// console.log(newData);
			}

			const user = await fetchInstance.get(`/staffs/staff/`);

			dispatch(loginSuccess(user.data));

			// props.setReload(() => []);
			setPhoto(null);

			setTimeout(() => {
				toast.success(res.data, {});
			}, 0);
		} catch (error) {
			let message = error.response
				? error.response.data.message
				: error.message;

			toast.error(message, {});
		} finally {
			setLoading(false);
		}
	};

	let topBarDataObj = {
		action: "Profile",
		// action: data.id.name + " Office",

		// planNumber: "BC/1212/2023",
	};

	return (
		<>
			<div className="Office">
				<Header />
				<div className="OfficeWrapper">
					<div className="OfficeSideBar">
						<SideBar selected={"office"} />
					</div>

					<div className="OfficeMiddleBar">
						{}
						<MiddleBar topBarData={topBarDataObj}>
							{/* <ListWrapper state={data} /> */}

							<div className="planInfoWrapper profile">
								<div className="top">
									<div className="info">
										<h2 className="name">
											{currentUser.firstName + " " + currentUser.lastName}
										</h2>
										<p className="jobTitle">{currentUser.jobTitle}</p>
										<p className="position">{currentUser.position}</p>
									</div>
									<div className="imageSection">
										<div className="profile-picture">
											<img src={photoURL} alt="Staff Picture" />
										</div>
										<div className="editButtons">
											{!photo && (
												<label htmlFor="updatePhoto">
													<p className="button">Update</p>
													{/* <button>Update Photo</button> */}
													<input
														type="file"
														id="updatePhoto"
														accept="image/png, image/jpeg, image/jpg"
														onChange={handlePhotoChange}
													/>
												</label>
											)}
											{photo && (
												<>
													<button
														className=" cancel button"
														onClick={() => resetPhoto()}
														disabled={loading}>
														Cancel
													</button>
													<button
														className=" primary button"
														onClick={handleSavePhoto}
														disabled={loading}>
														<span>Save</span>
														<span>
															{loading && (
																<LoadingIcon
																	thickness={5}
																	size={18}
																	className="white"
																/>
															)}
														</span>
													</button>
												</>
											)}
										</div>
									</div>
								</div>
								{/* <div>
									<p>Offices</p>
									<ul>
										<li>Assessment</li>
										<li>Clearing</li>
										<li>Record</li>
									</ul>
								</div> */}
							</div>
						</MiddleBar>
					</div>
				</div>
			</div>
		</>
	);
}
