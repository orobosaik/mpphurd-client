import "./settings.css";
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

const offices = [
	{ id: 1, name: "Office A" },
	{ id: 2, name: "Office B" },
	{ id: 3, name: "Office C" },
];

const initialPlans = [
	{ id: 1, name: "Plan 1" },
	{ id: 2, name: "Plan 2" },
	{ id: 3, name: "Plan 3" },
];

const Settings = () => {
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

	const [subscribedOffices, setSubscribedOffices] = useState([]);
	const [notificationSound, setNotificationSound] = useState(true);
	const [messageSound, setMessageSound] = useState(true);
	const [plans, setPlans] = useState(initialPlans);

	const toggleSubscription = (officeId) => {
		setSubscribedOffices((prev) =>
			prev.includes(officeId)
				? prev.filter((id) => id !== officeId)
				: [...prev, officeId]
		);
	};

	const deletePlan = (planId) => {
		setPlans((prev) => prev.filter((plan) => plan.id !== planId));
	};

	let topBarDataObj = {
		action: "Settings",
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
							<div>
								<div>
									<h3>Notifications</h3>

									<div>
										<h4>From Offices</h4>
										{offices.map((office) => (
											<div key={office.id}>
												<label>
													{office.name}
													<input
														type="checkbox"
														checked={subscribedOffices.includes(office.id)}
														onChange={() => toggleSubscription(office.id)}
													/>
												</label>
											</div>
										))}
									</div>

									<div>
										<h4>From Plans</h4>
										{plans.map((plan) => (
											<div key={plan.id}>
												<span>{plan.name}</span>
												<button onClick={() => deletePlan(plan.id)}>
													Remove
												</button>
											</div>
										))}
									</div>
								</div>

								<div>
									<h3>Sound Settings</h3>
									<div>
										<label>
											Notification Sound
											<input
												type="checkbox"
												checked={notificationSound}
												onChange={() =>
													setNotificationSound(!notificationSound)
												}
											/>
										</label>
									</div>
									<div>
										<label>
											Message Sound
											<input
												type="checkbox"
												checked={messageSound}
												onChange={() => setMessageSound(!messageSound)}
											/>
										</label>
									</div>
								</div>
							</div>
						</MiddleBar>
					</div>
				</div>
			</div>
		</>
	);
};

export default Settings;
