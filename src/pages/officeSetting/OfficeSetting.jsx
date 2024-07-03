import "./officeSetting.css";
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
import StaffOfficePermissionModal from "../../components/staffOfficePermissionModal/StaffOfficePermissionModal";
import { fetchInstance } from "../../utilities/fetcher";
import LoadingIcon from "../../utilities/LoadingIcon";

export default function OfficeSetting() {
	const dispatch = useDispatch();
	const location = useLocation();
	const data = location.state;

	const { officeData } = useSelector((state) => state.app);
	const { currentUser } = useSelector((state) => state.user);

	const componentRef = useRef();

	const [isLoading, setIsLoading] = useState(true);
	// const [data, setData] = useState();
	const [staff, setStaff] = useState([]);
	// const [region, setRegion] = useState([]);
	// const themeColor = getThemeColor();
	const [reload, setReload] = useState();
	const [lastPlanNumber, setLastPlanNumber] = useState();

	let topBarDataObj = {
		action: "Office Settings",
		// action: data.id.name + " Office",

		// planNumber: "BC/1212/2023",
	};

	const filterStaff = (e) => {
		return staff.filter((s) =>
			s.office.some((office) => office?.id?._id === e.id._id)
		);
	};
	const filterStaffOffice = (staff, office) => {
		let data;
		staff.office.forEach((o, i) => {
			if (o?.id?._id === office.id._id) {
				data = o;
			}
		});
		return data;
	};

	const getData = async () => {
		setIsLoading(true);
		try {
			const response = await fetchInstance.get(`/staffs/staff/all`);
			setStaff(response.data);
		} catch (e) {
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		getData();
	}, [reload]);

	return (
		<>
			<div className="pageWrapper"></div>
			<div className="Office">
				<Header />
				<div className="OfficeWrapper">
					<div className="OfficeSideBar">
						<SideBar selected={"office"} />
					</div>

					<div className="OfficeMiddleBar office_setting">
						<MiddleBar topBarData={topBarDataObj}>
							{/* <ListWrapper state={data} /> */}

							{isLoading ? (
								<LoadingIcon />
							) : (
								currentUser.office.map((e, i) => {
									return (
										<div className="planInfoWrapper" key={i}>
											<div className="top">
												<div className="head">
													<h2 className="office">{e.id.name}</h2>
													<p className="name">{e.id?.lead?.name}</p>
													{e.id?.lead?.name && (
														<p className="position">Lead Officer / Director</p>
													)}
												</div>

												<p className="title">MEMBERS:</p>

												<ol className="members">
													{[...filterStaff(e)].map((d, index) => {
														return (
															<li className="office_member" key={index}>
																<div>
																	<span>{index + 1}</span>
																	<span className="name">
																		{[
																			d.title,
																			d.firstName,
																			d.middleName,
																			d.lastName,
																			d.prefix,
																		]
																			.filter(
																				(value) =>
																					value != null &&
																					value !== "" &&
																					value !== undefined
																			)
																			.join(" ")}
																	</span>
																	<span>|</span>
																	<span className="jobTitle">
																		{d?.jobTitle}
																	</span>
																	<span>|</span>
																	<span className="level">{d?.position}</span>
																</div>
																<div>
																	<StaffOfficePermissionModal
																		buttonName={"Permissions"}
																		staffData={d}
																		officeData={filterStaffOffice(d, e)}
																		setReload={setReload}
																	/>
																	<button>View Profile</button>
																</div>
															</li>
														);
													})}
												</ol>
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
									);
								})
							)}
						</MiddleBar>
					</div>
				</div>
			</div>
		</>
	);
}
