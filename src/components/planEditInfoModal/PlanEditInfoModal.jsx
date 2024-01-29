import React, { useCallback, useEffect, useRef, useState } from "react";
import "./planEditInfoModal.css";
import {
	CloseRounded,
	EditRounded,
	FileUploadRounded,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import uuid from "react-uuid";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { getThemeColor } from "../../utilities/themeColor";
import { format } from "date-fns";
import {
	BUILDING_STATUS,
	BUILDING_TYPE,
	LGA_LIST,
	STACK_LIST,
} from "../../utilities/appData";

export default function PlanEditInfoModal({
	buttonIcon,
	buttonText,
	children,
	state,
	reload,
}) {
	const [submitting, setSubmitting] = useState(false);
	const [open, setOpen] = useState(false);
	const [data, setData] = useState(state);

	const isFastTrack = useRef();
	const isOldFile = useRef();
	const isFileOfInterest = useRef();

	const [controlledOptions, setControlledOptions] = useState({
		stack: state.stack,
		type: state.dev.type,
		lga: state.dev.lga,
		zone: state.dev.zone,
		status: state.dev.status,
	});

	const [assessment, setAssessment] = useState(
		state?.currentOffice?.id?.name.includes("ASSESSMENT")
	);
	const [clearing, setClearing] = useState(
		state?.currentOffice?.id?.name.includes("CLEARING HOUSE")
	);
	const [archive, setArchive] = useState(
		state?.currentOffice?.id?.name.includes("ARCHIVE")
	);
	const [commissioner, setCommissioner] = useState(
		state?.currentOffice?.id?.name.includes("COMMISSIONER")
	);

	const [isCompany, setIsCompany] = useState(
		state.applicant.type === "company" ? true : false
	);
	let [isEditingAmount, setIsEditingAmount] = useState(false);

	const [rawAmount, setRawAmount] = useState(Number(state.dev.assessedAmount));
	const [formattedAmount, setFormattedAmount] = useState(
		Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
		}).format(state.dev.assessedAmount || 0)
	);
	const [collectedApproval, setCollectedApproval] = useState(
		state.approval.isCollected
	); // For Archive Office
	const [planApprovalStatus, setPlanApprovalStatus] = useState(
		state.approval.status || "processing"
	); // For Archive Office & Commissioner Office

	// Approval Status editing option
	const [approvalStatusEdit, setApprovalStatusEdit] = useState(false);
	const [collectedApprovalEdit, setCollectedApprovalEdit] = useState(false);

	const { currentUser, loading } = useSelector((state) => state.user);
	const themeColor = getThemeColor();

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setRawAmount(Number(data.dev.assessedAmount));
		setFormattedAmount(
			Intl.NumberFormat("en-NG", {
				style: "currency",
				currency: "NGN",
			}).format(data.dev.assessedAmount || 0)
		);
		setSubmitting(false);
		setPlanApprovalStatus(data.approval.status || "processing");
		setCollectedApproval(data.approval.isCollected);
		setApprovalStatusEdit(false);
		setCollectedApprovalEdit(false);
		setOpen(false);
	};

	const handleEditSubmiteee = (e) => {
		e.preventDefault();
		setSubmitting(true);
		const form = new FormData(e.target);
		console.log(e);
		console.log(form);
	};

	const handleEditSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		console.log(e);
		const form = new FormData(e.target);
		console.log(form);

		let newData;

		if (clearing) {
			newData = {
				// applicant information
				"applicant.type": form.get("applicantType"),
				"applicant.name": form.get("applicantName"),
				"applicant.gender": form.get("applicantGender"),
				"applicant.address": form.get("applicantAddress"),
				"applicant.email": form.get("applicantEmail"),
				"applicant.phone": form.get("applicantPhone"),
				"applicant.phone1": form.get("applicantPhone1") || "",
				"applicant.photo": form.get("applicantPassport") || "",
				// "applicant.cacCertificate": form.get("applicantCacCertificate") || "",
				// "applicant.idCard": form.get("applicantIdCard") || "",

				// rep information
				"rep.name": form.get("repName"),
				"rep.gender": form.get("repGender"),
				"rep.address": form.get("repAddress"),
				"rep.email": form.get("repEmail"),
				"rep.phone": form.get("repPhone"),
				"rep.phone1": form.get("repPhone1") || "",
				// "rep.photo": form.get("repPassport") || "",
				// "rep.idCard": form.get("repIdCard") || "",

				// building information
				"dev.name": form.get("planBuildingName") || "",
				"dev.plotNo": form.get("planPlotNo"),
				"dev.address": form.get("planAddress"),
				"dev.region": form.get("planRegion") || "",
				"dev.lga": form.get("planLga") || "",
				"dev.zone": form.get("planZone") || "",
				"dev.type": form.get("planBuildingType") || "",
				"dev.use": form.get("planBuildingUse") || "",
				"dev.status": form.get("planBuildingStatus") || "",
				"dev.noOfFloor": form.get("planFloors") || "",
				"dev.coordinates": form.get("planCoordinates") || "",
			};
		} else if (assessment) {
			newData = {
				stack: form.get("planStack") || "",
				isFastTrack: isFastTrack.current.checked,
				isOldFile: isOldFile.current.checked,
				isFileOfInterest: isFileOfInterest.current.checked,

				// building information
				"dev.name": form.get("planBuildingName") || "",
				"dev.plotNo": form.get("planPlotNo"),
				"dev.address": form.get("planAddress"),
				"dev.region": form.get("planRegion") || "",
				"dev.lga": form.get("planLga") || "",
				"dev.zone": form.get("planZone") || "",
				"dev.type": form.get("planBuildingType") || "",
				"dev.use": form.get("planBuildingUse") || "",
				"dev.status": form.get("planBuildingStatus") || "",
				"dev.noOfFloor": form.get("planFloors") || "",
				"dev.coordinates": form.get("planCoordinates") || "",
				"dev.description": form.get("devDescription") || "",
				"dev.assessedAmount": rawAmount,
			};
		} else if (archive) {
			newData = {
				stack: form.get("planStack") || "",
				hasTax: form.get("planHasTax") === "yes" ? true : false,
				"dev.description": form.get("devDescription") || "",
			};

			if (approvalStatusEdit) {
				(newData["approval.status"] = form.get("planApprovalStatus")),
					(newData["approval.statusDate"] =
						form.get("planApprovalStatusDate") || new Date());
			}

			if (collectedApprovalEdit) {
				(newData["approval.isCollected"] =
					form.get("collectedApproval") === "yes" ? true : false),
					(newData["approval.isCollectedDate"] =
						form.get("collectedApprovalDate") || new Date());
			}
		} else if (commissioner) {
			newData = {
				stack: form.get("planStack") || "",
				hasTax: form.get("planHasTax") === "yes" ? true : false,
				"dev.description": form.get("devDescription") || "",
			};

			if (approvalStatusEdit) {
				(newData["approval.status"] = form.get("planApprovalStatus")),
					(newData["approval.statusDate"] =
						form.get("planApprovalStatusDate") || new Date());
			}
		} else {
			newData = {
				stack: form.get("planStack") || "",
				// building information
				"dev.description": form.get("devDescription") || "",
			};
		}

		console.log(newData);
		console.log(isOldFile);

		axios.defaults.withCredentials = true;

		try {
			let host = import.meta.env.VITE_SERVER;
			const res = await axios.put(`${host}/staffs/plan/${data._id}`, newData, {
				withCredentials: true,
			});
			console.log(res.data);

			// dispatch(resetOfficeData());
			// navigate(-2);
			reload(() => []);
			handleClose();

			setTimeout(() => {
				toast.success(res.data, {
					position: "top-right",
					autoClose: 1000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: themeColor,
				});
			}, 200);
		} catch (error) {
			let message = error.response
				? error.response.data.message
				: error.message;
			console.log(error);
			console.log(message);
			// handleClose();
			setSubmitting(false);

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
		}
	};

	const individualApplicationItems = (type, data) => {
		return (
			<div className="applicationItemsWrapper">
				<div className="applicationTitle">
					<h3>
						{type === "applicant"
							? "Applicant Information"
							: "Representative Information"}
					</h3>
				</div>

				<div className="applicationItems">
					{/* <div className="applicationItem">
						<div className="applicationItemName">
							<div>
								<label htmlFor={type + "Title"}>Title:</label>
								<input
									defaultValue={data.applicant.name}
									type="text"
									name={type + "Title"}
									id={type + "Title"}
								/>
							</div>
							<div>
								<label htmlFor={type + "FirstName"}>First name:</label>
								<input
									type="text"
									name={type + "FirstName"}
									id={type + "FirstName"}
								/>
							</div>
							<div>
								<label htmlFor={type + "Surname"}>Surname:</label>
								<input
									type="text"
									name={type + "Surname"}
									id={type + "Surname"}
								/>
							</div>
							<div>
								<label htmlFor={type + "OtherName"}>Other name:</label>
								<input
									type="text"
									name={type + "OtherName"}
									id={type + "OtherName"}
								/>
							</div>
							<div>
								<label htmlFor={type + "Suffix"}>Suffix:</label>
								<input
									type="text"
									name={type + "Suffix"}
									id={type + "Suffix"}
								/>
							</div>
						</div>
					</div> */}
					<div className="applicationItem">
						<div>
							<label htmlFor={type + "Name"}>
								{isCompany && type !== "rep" ? "Company Name:" : "Full Name:"}
							</label>
							<input
								defaultValue={data.name}
								type="text"
								name={type + "Name"}
								id={type + "Name"}
								required
							/>
						</div>
					</div>

					{/* <div className="applicationItem">
						<label htmlFor={type + "Gender"}>Gender:</label>
						<div className="radioBoxWrapper">
							<label htmlFor={type + "Gender1"}>
								<span>Female</span>
								<input
									type="radio"
									name="gender"
									value="female"
									id={type + "Gender1"}
								/>
							</label>

							<label htmlFor={type + "Gender2"}>
								<span>Male</span>
								<input
									type="radio"
									name="gender"
									value="male"
									id={type + "Gender2"}
								/>
							</label>
						</div>
					</div> */}

					{(!isCompany || type === "rep") && (
						<div className="applicationItem">
							<label htmlFor={type + "Gender"}>Gender:</label>
							<div className="radioBoxWrapper">
								<label htmlFor={type + "Gender1"}>
									<span>Female</span>
									<input
										defaultChecked={data?.gender === "female"}
										type="radio"
										name={type + "Gender"}
										value="female"
										id={type + "Gender1"}
										required
									/>
								</label>

								<label htmlFor={type + "Gender2"}>
									<span>Male</span>
									<input
										defaultChecked={data?.gender === "male"}
										type="radio"
										name={type + "Gender"}
										value="male"
										id={type + "Gender2"}
										required
									/>
								</label>
							</div>
						</div>
					)}
					{/*
					<div className="applicationItem">
						<label htmlFor={type + "Address"}>Address:</label>
						<input type="text" name={type + "Address"} id={type + "Address"} />
					</div> */}

					<div className="applicationItem">
						<label htmlFor={type + "Address"}>
							{isCompany && type !== "rep" ? "Company Address:" : "Address:"}
						</label>
						<input
							defaultValue={data?.address}
							type="text"
							name={type + "Address"}
							id={type + "Address"}
							required
						/>
					</div>

					<div className="applicationItem">
						<div className="applicationItemPhone">
							<div>
								<label htmlFor={type + "Phone1"}>Phone 1:</label>
								<input
									defaultValue={data?.phone}
									type="tel"
									name={type + "Phone1"}
									id={type + "Phone1"}
								/>
							</div>
							<div>
								<label htmlFor={type + "Phone2"}>Phone 2:</label>
								<input
									defaultValue={data?.phone1}
									type="tel"
									name={type + "Phone1"}
									id={type + "Phone2"}
								/>
							</div>
						</div>
					</div>
					<div className="applicationItem">
						<label htmlFor={type + "Email"}>Email:</label>
						<input
							defaultValue={data?.email}
							type={type + "Email"}
							id={type + "Email"}
						/>
					</div>
					{/* <div className="applicationItem">
						<label htmlFor={type + "MeansOfIdentification"}>
							Select Means of identification:
						</label>
						<label
							htmlFor={type + "MeansOfIdentification"}
							className="uploadFileWrapper">
							<span>
								<FileUploadRounded />
								Upload File
							</span>
							<input
								type="file"
								name={type + "MeansOfIdentification"}
								id={type + "MeansOfIdentification"}
								accept="image/png, image/jpeg, image/jpg"
							/>
						</label>
					</div> */}

					{(!isCompany || type === "rep") && (
						<div className="applicationItem">
							<label htmlFor={type + "IdCard"}>
								Select Means of identification:
							</label>
							<label htmlFor={type + "IdCard"} className="uploadFileWrapper">
								<span>
									<FileUploadRounded />
									Upload File
								</span>
								<input
									type="file"
									name={type + "IdCard"}
									id={type + "IdCard"}
									accept="image/png, image/jpeg, image/jpg"
								/>
							</label>
						</div>
					)}

					{/* <div className="applicationItem">
						<label htmlFor={type + "Passport"}>Select passport:</label>
						<label htmlFor={type + "Passport"} className="uploadFileWrapper">
							<span>
								<FileUploadRounded />
								Upload File
							</span>
							<input
								type="file"
								name={type + "Passport"}
								id={type + "Passport"}
								accept="image/png, image/jpeg, image/jpg"
							/>
						</label>
					</div> */}

					<div className="applicationItem">
						<label htmlFor={type + "Passport"}>
							{!isCompany || type === "rep"
								? "Select passport:"
								: "Select Logo"}
						</label>
						<label htmlFor={type + "Passport"} className="uploadFileWrapper">
							<span>
								<FileUploadRounded />
								Upload File
							</span>
							<input
								type="file"
								name={type + "Passport"}
								id={type + "Passport"}
								accept="image/png, image/jpeg, image/jpg"
							/>
						</label>
					</div>
					{isCompany && type !== "rep" && (
						<div className="applicationItem">
							<label htmlFor={type + "CacCertificate"}>
								Select CAC Certificate:
							</label>
							<label
								htmlFor={type + "CacCertificate"}
								className="uploadFileWrapper">
								<span>
									<FileUploadRounded />
									Upload File
								</span>
								<input
									type="file"
									name={type + "CacCertificate"}
									id={type + "CacCertificate"}
									accept="image/png, image/jpeg, image/jpg"
								/>
							</label>
						</div>
					)}
				</div>
			</div>
		);
	};

	const KEY_NAME_ESC = "Escape";
	const KEY_EVENT_TYPE = "keyup";

	useEscapeKey(handleClose);

	function useEscapeKey(handleClose) {
		const handleEscKey = useCallback(
			(event) => {
				if (event.key === KEY_NAME_ESC) {
					handleClose();
				}
			},
			[handleClose]
		);

		useEffect(() => {
			document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

			return () => {
				document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
			};
		}, [handleEscKey]);
	}

	useEffect(() => {
		const modal = document.querySelector(".modalView");
		if (modal) {
			open ? modal.showModal() : modal.close();
		}
	}, [open]);

	return (
		<div>
			<button className="modalTrigger" onClick={handleOpen}>
				<EditRounded className="editIcon" />
				{archive ? "Update" : "Edit"}
			</button>

			{open && (
				<dialog className="modalView">
					<header>
						<span>
							Edit Plan Info - {data?.planNumber?.fullValue || data?.uniqueId}
						</span>
						<div className="modalViewCloseButton" onClick={handleClose}>
							<CloseRounded className="closeButton" />
						</div>
					</header>

					<form action="" onSubmit={handleEditSubmit}>
						{!clearing && (
							<div className="currentStackEdit">
								<label htmlFor="planStack">Current Stack:</label>
								<select
									onChange={(e) => {
										let obj = {
											...controlledOptions,
											stack: e.target.value,
										};
										setControlledOptions(obj);
									}}
									name="planStack"
									id="planStack"
									value={controlledOptions.stack}>
									<option value="Not Stacked"></option>
									{STACK_LIST.map((e) => {
										return (
											<option key={uuid()} value={e}>
												{e}
											</option>
										);
									})}
								</select>
							</div>
						)}

						{(commissioner || archive) && (
							<div className="applicationItems">
								<div className="applicationItem">
									<label htmlFor="planHasTax">Has Tax:</label>
									<select
										name="planHasTax"
										id="planHasTax"
										defaultValue={data?.hasTax ? "yes" : "no"}>
										<option value="no">No</option>
										<option value="yes">Yes</option>
									</select>
								</div>

								<div className="applicationItem ">
									<div className="planApprovalStatus">
										<label htmlFor="planApprovalStatus">
											Plan Approval Status:
										</label>
										<div
											className="editBtn"
											onClick={() => {
												setApprovalStatusEdit(!approvalStatusEdit);
												setPlanApprovalStatus(data.approval?.status);
											}}>
											<span>
												{approvalStatusEdit ? "Cancel Update" : "Update"}
											</span>
										</div>
									</div>
									{!approvalStatusEdit && (
										<div className="approvalStatusDisplay">
											<span className="status">{data?.approval?.status}</span>
											||
											<span className="date">
												{data?.approval?.statusDate
													? format(
															new Date(data?.approval?.statusDate),
															"EEEE, MMMM do, yyyy"
													  )
													: "Pending"}
											</span>
										</div>
									)}

									{approvalStatusEdit && (
										<select
											defaultValue={data?.approval?.status}
											name="planApprovalStatus"
											id="planApprovalStatus"
											onChange={(e) => {
												setPlanApprovalStatus(e.target.value);
											}}>
											<option value="processing">Processing</option>
											<option value="rejected">Rejected</option>
											<option value="kiv">KIV</option>
											<option value="approved">Approved</option>
										</select>
									)}
								</div>

								{!(planApprovalStatus === "processing") &&
								approvalStatusEdit ? (
									<div className="applicationItem">
										<label htmlFor="planApprovalStatusDate">
											Approval Status Date:{" "}
											<span className="optionIssueTag">
												Do not select a date except for backlog
											</span>
										</label>
										<input
											defaultValue={
												data.approval.statusDate
													? new Date(data?.approval?.statusDate)
															.toISOString()
															.slice(0, 19)
													: ""
											}
											type="datetime-local"
											name="planApprovalStatusDate"
											id="planApprovalStatusDate"
										/>
									</div>
								) : (
									""
								)}
								<br />
							</div>
						)}

						{archive && (
							<div className="applicationItems">
								<div className="applicationItem">
									<div className="planApprovalStatus">
										<label htmlFor="collectedApproval">
											Collected Approval:
										</label>
										<div
											className="editBtn"
											onClick={() => {
												setCollectedApprovalEdit(!collectedApprovalEdit);
												setCollectedApproval(data.approval?.isCollected);
											}}>
											<span>
												{collectedApprovalEdit ? "Cancel Update" : "Update"}
											</span>
										</div>
									</div>
									{!collectedApprovalEdit && (
										<div className="approvalStatusDisplay">
											<span className="status">
												{data?.approval?.isCollected ? "Yes" : "No"}
											</span>
											||
											<span className="date">
												{data?.approval?.isCollectedDate
													? format(
															new Date(data?.approval?.isCollectedDate),
															"EEEE, MMMM do, yyyy"
													  )
													: "Pending"}
											</span>
										</div>
									)}

									{collectedApprovalEdit && (
										<select
											defaultValue={data?.approval?.isCollected ? "yes" : "no"}
											name="collectedApproval"
											id="collectedApproval"
											onChange={(e) => {
												setCollectedApproval(
													e.target.value == "yes" ? true : false
												);
											}}>
											<option value="no">No</option>
											<option value="yes">Yes</option>
										</select>
									)}
								</div>
								{collectedApproval && collectedApprovalEdit && (
									<div className="applicationItem">
										<label htmlFor="collectedApprovalDate">
											Collection Date:
											<span className="optionIssueTag">
												Do not select a date except for backlog
											</span>
										</label>
										<input
											defaultValue={
												data?.approval?.isCollectedDate
													? new Date(data?.approval?.isCollectedDate)
															.toISOString()
															.slice(0, 23)
													: ""
											}
											type="datetime-local"
											name="collectedApprovalDate"
											id="collectedApprovalDate"
										/>
									</div>
								)}
								<br />
							</div>
						)}

						{assessment && (
							<>
								<div className="planEditInfoTags">
									<h4>Tags:</h4>

									<div className="planEditInfoTagsOptions">
										<div>
											<label htmlFor="fastTrack">Fast Track</label>
											<input
												defaultChecked={data.isFastTrack}
												type="checkbox"
												name="fastTrack"
												id="fastTrack"
												ref={isFastTrack}
											/>
										</div>

										<div>
											<label htmlFor="oldFile">Old File</label>
											<input
												defaultChecked={data.isOldFile}
												type="checkbox"
												name="oldFile"
												id="oldFile"
												ref={isOldFile}
											/>
										</div>

										<div>
											<label htmlFor="fileOfInterest">File Of Interest</label>
											<input
												defaultChecked={data.isFileOfInterest}
												type="checkbox"
												name="fileOfInterest"
												id="fileOfInterest"
												ref={isFileOfInterest}
											/>
										</div>
									</div>
								</div>
								<br />

								<div className="modalAssessedAmount">
									<label htmlFor="assessedAmount">Assessed Amount:</label>

									<input
										onFocus={() => {
											setIsEditingAmount(true);
										}}
										onBlur={() => {
											setIsEditingAmount(false);
										}}
										onChange={(e) => {
											const val = e.target.value;
											setRawAmount(Number(val));
											setFormattedAmount(
												Intl.NumberFormat("en-NG", {
													style: "currency",
													currency: "NGN",
												}).format(val)
											);
										}}
										type={isEditingAmount ? "number" : "text"}
										value={isEditingAmount ? rawAmount : formattedAmount}
										name="assessedAmount"
										id="assessedAmount"
									/>

									{/* <div>
										<label htmlFor="oldFile">Old File</label>
										<input
											defaultChecked={data.isOldFile}
											type="checkbox"
											name="oldFile"
											id="oldFile"
										/>
									</div> */}

									{/* <div>
										<label htmlFor="fileOfInterest">File Of Interest</label>
										<input
											defaultChecked={data.isFileOfInterest}
											type="checkbox"
											name="fileOfInterest"
											id="fileOfInterest"
										/>
									</div> */}
								</div>
							</>
						)}

						{/* APPLICANT INFORMATION */}
						{clearing &&
							individualApplicationItems("applicant", data.applicant)}

						{/* REP INFORMATION */}
						{clearing && individualApplicationItems("rep", data.rep)}

						{/* BUILDING APPLICATION INFORMATION */}
						{clearing || assessment ? (
							<div className="applicationItemsWrapper">
								<div className="applicationTitle">
									<h3>Development Information</h3>
								</div>
								<div className="applicationItems">
									<div className="applicationItem">
										<div>
											<label htmlFor="planBuildingName">Building Name:</label>
											<input
												defaultValue={data.dev.name}
												type="text"
												name="planBuildingName"
												id="planBuildingName"
											/>
										</div>
									</div>
									<div className="applicationItem">
										<div className="applicationItemAddressModal">
											<div>
												<label htmlFor="planPlotNo">Plot No:</label>
												<input
													defaultValue={data.dev.plotNo}
													type="text"
													name="planPlotNo"
													required
													id="planPlotNo"
												/>
											</div>
											<div>
												<label htmlFor="planAddress">Address:</label>
												<input
													defaultValue={data.dev.address}
													type="text"
													name="planAddress"
													id="planAddress"
													required
												/>
											</div>
										</div>
									</div>
									<div className="applicationItem">
										<div className="applicationItemLocation">
											<div>
												<label htmlFor="planRegion">Region:</label>
												<input
													type="text"
													readOnly
													name="planRegion"
													value={data.dev.region}
													id="planRegion"
												/>
											</div>
											<div>
												<label htmlFor="planLga">LGA:</label>
												<select
													onChange={(e) => {
														let obj = {
															...controlledOptions,
															lga: e.target.value,
														};
														setControlledOptions(obj);
													}}
													name="planLga"
													id="planLga"
													value={controlledOptions.lga}>
													<option value=""></option>
													{LGA_LIST.map((e) => {
														return (
															<option key={uuid()} value={e}>
																{e}
															</option>
														);
													})}
												</select>
											</div>
											<div>
												<label htmlFor="planZone">Zone:</label>
												<select
													onChange={(e) => {
														let obj = {
															...controlledOptions,
															zone: e.target.value,
														};
														setControlledOptions(obj);
													}}
													name="planZone"
													id="planZone"
													value={controlledOptions.zone}>
													<option value=""></option>
													{currentUser.region.zones.map((e) => {
														return (
															<option key={uuid()} value={e}>
																{e}
															</option>
														);
													})}
												</select>
											</div>
										</div>
									</div>
									<div className="applicationItem">
										<div className="applicationItemType">
											<div>
												<label htmlFor="planBuildingType">Building Type:</label>
												<select
													onChange={(e) => {
														let obj = {
															...controlledOptions,
															type: e.target.value,
														};
														setControlledOptions(obj);
													}}
													name="planBuildingType"
													id="planBuildingType"
													value={controlledOptions.type}>
													<option value=""></option>
													{BUILDING_TYPE.map((e) => {
														return (
															<option key={uuid()} value={e}>
																{e}
															</option>
														);
													})}
												</select>
											</div>
											<div>
												<label htmlFor="planBuildingUse">Building Use:</label>
												<input
													type="text"
													name="planBuildingUse"
													id="planBuildingUse"
													defaultValue={data.dev.use}
												/>
											</div>
											<div>
												<label htmlFor="planBuildingStatus">
													Building Status:
												</label>
												<select
													onChange={(e) => {
														let obj = {
															...controlledOptions,
															status: e.target.value,
														};
														setControlledOptions(obj);
													}}
													name="planBuildingStatus"
													id="planBuildingStatus"
													value={controlledOptions.status}>
													<option value=""></option>
													{BUILDING_STATUS.map((e) => {
														return (
															<option key={uuid()} value={e}>
																{e}
															</option>
														);
													})}
												</select>
											</div>
										</div>
									</div>
									<div className="applicationItem">
										<div className="applicationItemType">
											<div>
												<label htmlFor="planFloors">No of Floors:</label>
												<input
													type="text"
													name="planFloors"
													id="planFloors"
													defaultValue={data.dev.noOfFloors}
												/>
											</div>
											<div>
												<label htmlFor="planCoordinates">
													Survey Coordinates:
												</label>
												<input
													defaultValue={data.dev.coordinates}
													type="text"
													name="planCoordinates"
													id="planCoordinates"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						) : (
							""
						)}

						{!clearing && (
							<div className="minuteItem">
								<label htmlFor="devDescription">Development Description:</label>
								<textarea
									defaultValue={data?.dev?.description}
									name="devDescription"
									id="devDescription"
									cols="30"
									rows="7"></textarea>
							</div>
						)}

						<br />
						<footer>
							{" "}
							<button type="submit" className="primary" disabled={submitting}>
								{submitting ? (
									<CircularProgress
										thickness={5}
										size={20}
										sx={{ color: "white" }}
									/>
								) : (
									"Save"
								)}
							</button>
						</footer>
					</form>
				</dialog>
			)}
		</div>
	);
}
