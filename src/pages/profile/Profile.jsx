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

export default function Profile() {
	const dispatch = useDispatch();
	const location = useLocation();
	const data = location.state;

	const { officeData } = useSelector((state) => state.app);
	const { currentUser } = useSelector((state) => state.user);

	const componentRef = useRef();

	// const [isLoading, setIsLoading] = useState(true);
	// const [data, setData] = useState();
	// const [staff, setStaff] = useState([]);
	// const [region, setRegion] = useState([]);
	// const themeColor = getThemeColor();
	const [reload, setReload] = useState();
	const [lastPlanNumber, setLastPlanNumber] = useState();

	let topBarDataObj = {
		action: "Profile Page",
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
									<div className="profile-picture">
										<img
											src={
												currentUser.profilePicture ||
												"/assets/persons/no_avatar.png"
											}
											alt="Staff Picture"
										/>
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
