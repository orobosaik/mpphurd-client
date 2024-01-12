import React, { useCallback, useEffect, useState } from "react";
import "./planEditInfoModal.css";
import {
	CloseRounded,
	EditRounded,
	FileUploadRounded,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

const LGA_LIST = [
	"Akoko-Edo",
	"Egor",
	"Esan Central",
	"Esan North-East",
	"Esan South-East",
	"Esan West",
	"Etsako Central",
	"Etsako East",
	"Etsako West",
	"Igueben",
	"Ikpoba-Okha",
	"Oredo",
	"Orhionmwon",
	"Ovia North-East",
	"Ovia South-West",
	"Owan East",
	"Owan West",
	"Uhunmwonde",
];
const BUILDING_STATUS = ["Proposed", "Under Construction", "Built"];
const BUILDING_TYPE = [
	"Commercial",
	"Residential",
	"Mixed",
	"Religious",
	"Educational",
	"Industrial",
];

export default function PlanEditInfoModal({
	buttonIcon,
	buttonText,
	children,
	state,
}) {
	const [submitting, setSubmitting] = useState(false);
	const [open, setOpen] = useState(false);
	const [data, setData] = useState(state);
	const [assessment, setAssessment] = useState(
		state?.currentOffice?.id?.name.includes("ASSESSMENT")
	);
	const [clearing, setClearing] = useState(
		state?.currentOffice?.id?.name.includes("CLEARING HOUSE")
	);
	const [archive, setArchive] = useState(
		state?.currentOffice?.id?.name.includes("ARCHIVE")
	);

	const [isCompany, setIsCompany] = useState(
		state.applicant.type === "company" ? true : false
	);
	const [isEditingAmount, setIsEditingAmount] = useState(false);
	const [rawAmount, setRawAmount] = useState(Number(state.assessedAmount) || 0);
	const [formattedAmount, setFormattedAmount] = useState(
		Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
		}).format(state.assessedAmount || 0)
	);
	const [collectedApproval, setCollectedApproval] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setRawAmount(Number(data.assessedAmount) || 0);
		setFormattedAmount(
			Intl.NumberFormat("en-NG", {
				style: "currency",
				currency: "NGN",
			}).format(data.assessedAmount || 0)
		);
		setOpen(false);
	};

	const handleEditSubmit = (e) => {
		e.preventDefault();
		setSubmitting(true);
		const form = new FormData(e.target);
		console.log(e);
		console.log(form);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const form = new FormData(e.target);
		console.log(form);

		const newData = {
			status: form.get("minuteStatus"),
			text: form.get("minuteText"),
			if(submitting) {
				text: form.get("minuteText");
			},
		};
		console.log(newData);

		axios.defaults.withCredentials = true;

		try {
			let host = import.meta.env.VITE_SERVER;
			const res = await axios.post(
				`${host}/staffs/plan/${data._id}/comment`,
				newData,
				{
					withCredentials: true,
				}
			);
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

	const individualApplicationItems = (type) => {
		return (
			<div className="applicationItemsWrapper">
				<div className="applicationTitle">
					<h3>Applicant Information</h3>
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
								defaultValue={data.applicant.name}
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
										defaultChecked={data.applicant?.gender === "female"}
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
										defaultChecked={data.applicant?.gender === "male"}
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
							defaultValue={data.applicant?.address}
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
									defaultValue={data.applicant?.phone}
									type="tel"
									name={type + "Phone1"}
									id={type + "Phone1"}
								/>
							</div>
							<div>
								<label htmlFor={type + "Phone2"}>Phone 2:</label>
								<input
									defaultValue={data.applicant?.phone1}
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
							defaultValue={data.applicant?.email}
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
						<span>Edit Plan Info</span>
						<div className="modalViewCloseButton" onClick={handleClose}>
							<CloseRounded className="closeButton" />
						</div>
					</header>

					<form action="" onSubmit={handleEditSubmit}>
						{!clearing && (
							<div className="currentStackEdit">
								<label htmlFor="planBuildingStatus">Current Stack:</label>
								<select
									name="planBuildingStatus"
									id="planBuildingStatus"
									defaultValue={data?.stack}>
									<option value="a1">Stack A1</option>
									<option value="a2">Stack A2</option>
									<option value="a3">Stack A3</option>
								</select>
							</div>
						)}

						{archive && (
							<>
								<div className="currentStackEdit">
									<label htmlFor="planBuildingStatus">Has Tax:</label>
									<select
										name="planBuildingStatus"
										id="planBuildingStatus"
										defaultValue={data?.hasTax}>
										<option value="no">No</option>
										<option value="yes">Yes</option>
									</select>
								</div>
								<div className="currentStackEdit">
									<label htmlFor="collectedApproval">Collected Approval:</label>
									<select
										defaultValue={data?.approval?.isCollected}
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
								</div>
								{collectedApproval && (
									<div className="currentStackEdit">
										<label htmlFor="collectedApprovalDate">
											Collection Date:
										</label>
										<input
											defaultValue={data?.approval?.isCollectedDate}
											type="date"
											name="collectedApprovalDate"
											id="collectedApprovalDate"
										/>
									</div>
								)}
							</>
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
											/>
										</div>

										<div>
											<label htmlFor="oldFile">Old File</label>
											<input
												defaultChecked={data.isOldFile}
												type="checkbox"
												name="oldFile"
												id="oldFile"
											/>
										</div>

										<div>
											<label htmlFor="fileOfInterest">File Of Interest</label>
											<input
												defaultChecked={data.isFileOfInterest}
												type="checkbox"
												name="fileOfInterest"
												id="fileOfInterest"
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
											setRawAmount(val);
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
						{clearing && individualApplicationItems("applicant")}

						{/* BUILDING APPLICATION INFORMATION */}
						{clearing || assessment ? (
							<div className="applicationItemsWrapper">
								<div className="applicationTitle">
									<h3>Development Information</h3>
								</div>
								<div className="applicationItems">
									<div className="applicationItem">
										<div>
											<label htmlFor="planBusinessName">Building Name:</label>
											<input
												defaultValue={data.dev?.name}
												type="text"
												name="planBusinessName"
												id="planBusinessName"
											/>
										</div>
									</div>
									<div className="applicationItem">
										<div className="applicationItemAddressModal">
											<div>
												<label htmlFor="planPlotNo">Plot No:</label>
												<input
													defaultValue={data.dev?.plotNo}
													type="text"
													name="planPlotNo"
													id="planPlotNo"
												/>
											</div>
											<div>
												<label htmlFor="planAddress">Address:</label>
												<input
													defaultValue={data.dev?.address}
													type="text"
													name="planAddress"
													id="planAddress"
												/>
											</div>
										</div>
									</div>
									<div className="applicationItem">
										<div className="applicationItemLocation">
											<div>
												<label htmlFor="planRegion">Region:</label>
												<input
													defaultValue={data.dev?.region}
													type="text"
													name="planRegion"
													id="planRegion"
												/>
											</div>
											<div>
												<label htmlFor="planLga">LGA:</label>
												<input
													defaultValue={data.dev?.lga}
													type="text"
													name="planLga"
													id="planLga"
												/>
											</div>
											<div>
												<label htmlFor="planZone">Zone:</label>
												<input
													defaultValue={data.dev?.zone}
													type="text"
													name="planZone"
													id="planZone"
												/>
											</div>
										</div>
									</div>
									<div className="applicationItem">
										<div className="applicationItemType">
											<div>
												<label htmlFor="planBuildingType">Building Type:</label>
												<input
													defaultValue={data.dev?.type}
													type="text"
													name="planBuildingType"
													id="planBuildingType"
												/>
											</div>
											<div>
												<label htmlFor="planBuildingUse">Building Use:</label>
												<input
													defaultValue={data.dev?.use}
													type="text"
													name="planBuildingUse"
													id="planBuildingUse"
												/>
											</div>
											<div>
												<label htmlFor="planBuildingStatus">
													Building Status:
												</label>
												<select
													defaultValue={data.dev?.status}
													name="planBuildingStatus"
													id="planBuildingStatus">
													<option value="proposed">Proposed</option>
													<option value="underConstruction">
														Under Construction
													</option>
													<option value="built">Built</option>
												</select>
											</div>
										</div>
									</div>
									<div className="applicationItem">
										<div className="applicationItemType">
											<div>
												<label htmlFor="planFloors">No of Floors:</label>
												<input
													defaultValue={data.dev?.noOfFloors}
													type="text"
													name="planFloors"
													id="planFloors"
												/>
											</div>
											<div>
												<label htmlFor="planCoordinate">
													Survey Coordinates:
												</label>
												<input
													defaultValue={data.dev?.coordinates}
													type="text"
													name="planCoordinate"
													id="planCoordinate"
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
								<label htmlFor="minuteText">Development Description:</label>
								<textarea
									defaultValue={data?.dev?.description}
									name="minuteText"
									id="minuteText"
									cols="30"
									rows="5"></textarea>
							</div>
						)}
						<br />
						<footer>
							{" "}
							<button type="submit" className="primary">
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
