import "./office.css";
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

export default function Office() {
	const dispatch = useDispatch();
	const location = useLocation();
	const data = location.state;

	const { officeData } = useSelector((state) => state.app);
	const { currentUser } = useSelector((state) => state.user);

	const componentRef = useRef();

	function exportPDF() {
		return (
			<>
				<div className="exportPDF" ref={componentRef}>
					<img
						alt={""}
						src={"/assets/logos/Logo-Mpphurd.png"}
						className={"watermark"}
					/>
					<table className="report-container">
						<thead className="report-header">
							<tr>
								<th className="report-header-cell">
									{/* <div className="header-info">header content....</div> */}

									<div className="header">
										<div className="header-info">
											<div className="header-info-left">
												<div className="header-logos">
													<img
														className="header-logo"
														src="/assets/logos/Logo-Edo State.png"
														alt=""
													/>
													<div></div>
													<img
														className="header-logo"
														src="/assets/logos/Logo-Mpphurd.png"
														alt=""
													/>
												</div>
												<div className="header-text">
													<span className="header-text-office">
														{data?.id?.name} OFFICE RECORD
													</span>
													<div>
														<span className="header-text-type">
															{officeData?.type?.toUpperCase()}
														</span>
														<span className="header-text-date">
															{officeData?.type !== "current" && (
																<>
																	({format(officeData?.startDate, "dd/MM/yyyy")}{" "}
																	- {format(officeData?.endDate, "dd/MM/yyyy")})
																</>
															)}
														</span>
													</div>
												</div>
											</div>
											<div className="header-info-right">
												{/* <span className="header-text-type">Search: Johnbull edion</span> */}
												<span className="header-text-total">
													Total - {officeData?.data?.length}
												</span>
												<span className="header-text-printdate">
													Printed on {format(new Date(), "dd/MM/yyyy, HH:mm")}
												</span>
											</div>
										</div>
										<div className="header-rule"></div>

										<div className="listHeader listFormat">
											<span>Plan No</span>
											<span>File Name</span>
											<span>Location</span>
											<span>Property Type</span>
											<span>Has Rep</span>
											<span>Zone / stk</span>
										</div>
									</div>
								</th>
							</tr>
						</thead>
						<tfoot className="report-footer">
							<tr>
								<td className="report-footer-cell">
									<div className="footer-info">
										<div className={"page-footer"}>
											<div className="footer-rule"></div>
											<div>
												<p>
													Ministry of Physical Planning, Housing, Urban and
													Regional Development.
												</p>
											</div>
										</div>
									</div>
								</td>
							</tr>
						</tfoot>
						<tbody className="report-content">
							<tr>
								<td className="report-content-cell">
									{/* <div className="main">body content...</div> */}

									{/* <div className="main">{"content"}</div> */}

									<div className="main">
										{officeData?.listArray?.map((arr, index) => {
											return (
												<ListCardContainer
													key={index}
													date={arr.date}
													count={arr.items.length}>
													{arr.items.toReversed().map((item, i) => {
														return (
															<ListCard
																key={uuid()}
																data={item}
																type={officeData?.type}
															/>
														);
													})}
												</ListCardContainer>
											);
										})}
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</>
		);
	}

	// Check if User has authorization to export data
	const exportPermitted = currentUser?.office?.some((e) => {
		return data?.id?._id === e?.id?._id && e.tasks.includes("EXPORT DATA");
	});

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		documentTitle: `${
			data?.id?.name
		}_OFFICE_RECORD_${officeData?.type?.toUpperCase()}${
			officeData?.type !== "current"
				? `__${format(officeData?.startDate, "dd-MM-yyyy")}_to_
				  ${format(officeData?.endDate, "dd-MM-yyyy")}`
				: ""
		}`,
		removeAfterPrint: true,
		suppressErrors: true,
	});

	// const [isLoading, setIsLoading] = useState(true);
	// const [data, setData] = useState();
	// const [staff, setStaff] = useState([]);
	// const [region, setRegion] = useState([]);
	// const themeColor = getThemeColor();
	const [reload, setReload] = useState();
	const [lastPlanNumber, setLastPlanNumber] = useState();

	const isAssessmentOffice = () => {
		return data.id.name.toUpperCase() === "ASSESSMENT";
	};

	let topBarDataObj = isAssessmentOffice()
		? {
				action: data.id.name + " Office",
				options: (
					<DropDownSelect
						disable={true}
						data={{
							title: "Export Data",
							items: [
								{
									text: "Download PDF Format",
									disabled: !exportPermitted,
									action: exportPermitted ? handlePrint : () => null,
								},
								{
									text: "Download CSV Format",
									disabled: true,
									action: () => null,
								},
							],
						}}
					/>
				),
				lastPlanNo: lastPlanNumber,
				// planNumber: "BC/1212/2023",
		  }
		: {
				action: data.id.name + " Office",
				options: (
					<DropDownSelect
						disable={true}
						data={{
							title: "Export Data",
							items: [
								{
									text: "Download PDF Format",
									disabled: !exportPermitted,
									action: exportPermitted ? handlePrint : () => null,
								},
								{
									text: "Download CSV Format",
									disabled: true,
									action: () => null,
								},
							],
						}}
					/>
				),
				// planNumber: "BC/1212/2023",
		  };

	useEffect(() => {
		const getData = async () => {
			try {
				let host = import.meta.env.VITE_SERVER;
				const res = await axios.get(`${host}/staffs/plan/last-plan-number`);
				setLastPlanNumber(res.data);
			} catch (error) {}
		};

		if (isAssessmentOffice()) {
			getData();
		}
	}, [reload]);

	return (
		<>
			{exportPDF()}
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
							<ListWrapper state={data} />
						</MiddleBar>
					</div>
				</div>
			</div>
		</>
	);
}
