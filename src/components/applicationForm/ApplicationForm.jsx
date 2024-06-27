import { useEffect, useState } from "react";
import {
	FileUploadRounded,
	Image,
	UploadFileRounded,
} from "@mui/icons-material";
import "./applicationForm.css";
import ToggleSwitch from "../toggleSwitch/ToggleSwitch";
import axios from "axios";
import { toast } from "react-toastify";
import { getThemeColor } from "../../utilities/themeColor";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import {
	BUILDING_STATUS,
	BUILDING_TYPE,
	LGA_LIST,
} from "../../utilities/appData";

export default function ApplicationForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [isCompany, setIsCompany] = useState(false);
	const [isJoint, setIsJoint] = useState(true);
	const [hasRep, setHasRep] = useState(true);

	const { currentUser, loading } = useSelector((state) => state.user);

	const themeColor = getThemeColor();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(e);
		const form = new FormData(e.target);
		// console.log(form);
		setIsLoading(true);

		let newData = {
			// applicant information
			"applicant.type": isCompany === true ? "organization" : "individual",
			"applicant.name": form.get("applicantName") || "",
			"applicant.gender": form.get("applicantGender") || "",
			"applicant.address": form.get("applicantAddress") || "",
			"applicant.email": form.get("applicantEmail") || "",
			"applicant.phone": form.get("applicantPhone") || "",
			"applicant.phone1": form.get("applicantPhone1") || "",
			"applicant.photo": form.get("applicantPassport") || "",
			"applicant.cacCertificate": form.get("applicantCacCertificate") || "",
			"applicant.idCard": form.get("applicantIdCard") || "",
			// rep information
			"rep.name": form.get("repName") || "",
			"rep.gender": form.get("repGender") || "",
			"rep.address": form.get("repAddress") || "",
			"rep.email": form.get("repEmail") || "",
			"rep.phone": form.get("repPhone") || "",
			"rep.phone1": form.get("repPhone1") || "",
			"rep.photo": form.get("repPassport") || "",
			"rep.idCard": form.get("repIdCard") || "",
			// building information
			"dev.name": form.get("planBuildingName") || "",
			"dev.plotNo": form.get("planPlotNo") || "",
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

		// console.log(newData);

		axios.defaults.withCredentials = true;

		try {
			let host = import.meta.env.VITE_SERVER;
			const res = await axios.post(`${host}/staffs/plan`, newData, {
				withCredentials: true,
			});
			// console.log(res.data);

			navigate(`/permit/${res.data._id}`);

			setTimeout(() => {
				toast.success("New Application Created", {
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
			// console.log(error);
			// console.log(message);

			setIsLoading(false);

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
			<div className="applicationItems">
				<div className="applicationItem">
					{/* <div className="applicationItemName"> */}
					<div>
						<label htmlFor={type + "Name"}>
							{isCompany && type !== "rep"
								? "Organization Name:"
								: "Full Name:"}
						</label>
						<input
							type="text"
							name={type + "Name"}
							id={type + "Name"}
							required
						/>
					</div>

					{/* </div> */}
				</div>

				{(!isCompany || type === "rep") && (
					<div className="applicationItem">
						<label htmlFor={type + "Gender"}>Gender:</label>
						<div className="radioBoxWrapper">
							<label htmlFor={type + "Gender1"}>
								<span>Female</span>
								<input
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
				<div className="applicationItem">
					<label htmlFor={type + "Address"}>
						{isCompany && type !== "rep" ? "Organization Address:" : "Address:"}
					</label>
					<input
						type="text"
						name={type + "Address"}
						id={type + "Address"}
						required
					/>
				</div>
				<div className="applicationItem">
					<div className="applicationItemPhone">
						<div>
							<label htmlFor={type + "Phone"}>Phone 1:</label>
							<input
								type="tel"
								name={type + "Phone"}
								id={type + "Phone"}
								required
							/>
						</div>
						<div>
							<label htmlFor={type + "Phone1"}>Phone 2:</label>
							<input type="tel" name={type + "Phone1"} id={type + "Phone1"} />
						</div>
					</div>
				</div>
				<div className="applicationItem">
					<label htmlFor={type + "Email"}>Email:</label>
					<input
						type="email"
						required
						name={type + "Email"}
						id={type + "Email"}
					/>
				</div>

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

				<div className="applicationItem">
					<label htmlFor={type + "Passport"}>
						{!isCompany || type === "rep" ? "Select passport:" : "Select Logo"}
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
		);
	};

	const companyApplicationItems = (type) => {
		return (
			<div className="applicationItems">
				<div className="applicationItem">
					<div>
						<label htmlFor={type + "Name"}>Organization Name:</label>
						<input
							type="apl1Text"
							name={type + "Name"}
							id={type + "Name"}
							required
						/>
					</div>
				</div>

				<div className="applicationItem">
					<label htmlFor={type + "Address"}>Organization Address:</label>
					<input
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
								type="tel"
								name={type + "Phone1"}
								id={type + "Phone1"}
								required
							/>
						</div>
						<div>
							<label htmlFor={type + "Phone2"}>Phone 2:</label>
							<input type="tel" name={type + "Phone1"} id={type + "Phone2"} />
						</div>
					</div>
				</div>
				<div className="applicationItem">
					<label htmlFor={type + "Email"}>Email:</label>
					<input type={type + "Email"} id={type + "Email"} />
				</div>
				<div className="applicationItem">
					<label htmlFor={type + "cacCertificate"}>
						Select CAC Certificate:
					</label>
					<label
						htmlFor={type + "cacCertificate"}
						className="uploadFileWrapper">
						<span>
							<FileUploadRounded />
							Upload File
						</span>
						<input
							type="file"
							name={type + "cacCertificate"}
							id={type + "cacCertificate"}
							accept="image/png, image/jpeg, image/jpg"
						/>
					</label>
				</div>
			</div>
		);
	};

	const documentUpload = (id, label) => {
		return (
			<div className="applicationItem">
				<label htmlFor={id + "Document"}>{label}:</label>
				<label htmlFor={id + "Document"} className="uploadFileWrapper">
					<span>
						<FileUploadRounded />
						Upload File
					</span>
					<input
						type="file"
						name={id + "Document"}
						id={id + "Document"}
						accept="image/png, image/jpeg, image/jpg, .pdf"
					/>
				</label>
			</div>
		);
	};

	return (
		<>
			<form action="#" onSubmit={handleSubmit}>
				<div className="applicationForm">
					<div className="applicationHeader">
						<div>
							<span>Applicant Type:</span>
							<select
								className="secondary"
								required
								name="applicantType"
								id="applicantType"
								onChange={(e) =>
									setIsCompany(e.target.value === "individual" ? false : true)
								}>
								<option value="individual">Individual</option>
								<option value="organization">Organization</option>
							</select>
						</div>
					</div>

					<div className="applicationInputWrapper">
						<div className="applicationItemsWrapper">
							<div className="applicationTitle">
								<h3>
									{" "}
									{!isCompany
										? "Applicant Personal Information"
										: "Organization Information"}
								</h3>
								{/* <div className="applicantCode">
									<span>Uni Code:</span>
									<input type="text" />
								</div> */}
								{
									<div>
										<span>Has Rep</span>
										<ToggleSwitch
											label={"Rep:"}
											toggled={hasRep}
											onClick={() => setHasRep(!hasRep)}
										/>
									</div>
								}
							</div>
							{individualApplicationItems("applicant")}
						</div>

						{/* REP INFORMATION */}
						{hasRep && (
							<div className="applicationItemsWrapper">
								<div className="applicationTitle">
									<h3>Representative Information</h3>
								</div>
								{individualApplicationItems("rep")}
							</div>
						)}

						{/* BUILDING APPLICATION INFORMATION */}
						<div className="applicationItemsWrapper">
							<div className="applicationTitle">
								<h3>Development Information</h3>
							</div>
							<div className="applicationItems">
								<div className="applicationItem">
									<div>
										<label htmlFor="planBuildingName">
											Development / Building Name:
										</label>
										<input
											type="text"
											name="planBuildingName"
											id="planBuildingName"
										/>
									</div>
								</div>
								<div className="applicationItem">
									<div className="applicationItemAddress">
										<div>
											<label htmlFor="planPlotNo">Plot No:</label>
											<input
												type="text"
												name="planPlotNo"
												required
												id="planPlotNo"
											/>
										</div>
										<div>
											<label htmlFor="planAddress">Address:</label>
											<input
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
												value={currentUser.region.name}
												id="planRegion"
											/>
										</div>
										<div>
											<label htmlFor="planLga">LGA:</label>
											<select name="planLga" id="planLga">
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
											<select name="planZone" id="planZone">
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
											<label htmlFor="planBuildingType">
												Building/Dev Type:
											</label>
											<select
												required
												name="planBuildingType"
												id="planBuildingType">
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
											<label htmlFor="planBuildingUse">Building/Dev Use:</label>
											<input
												type="text"
												name="planBuildingUse"
												id="planBuildingUse"
											/>
										</div>
										<div>
											<label htmlFor="planBuildingStatus">
												Building/Dev Status:
											</label>
											<select
												required
												name="planBuildingStatus"
												id="planBuildingStatus">
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
											<input type="text" name="planFloors" id="planFloors" />
										</div>
										<div>
											<label htmlFor="planCoordinates">
												Survey Coordinates:
											</label>
											<input
												type="text"
												name="planCoordinates"
												id="planCoordinates"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* UPLOAD DOCUMENTS */}
						<div className="applicationItemsWrapper">
							<div className="applicationTitle">
								<h3>Upload The Relevant Documents</h3>
							</div>
							<div className="applicationItems">
								{documentUpload("survey", "Survey plan")}
								{documentUpload("layout", "Layout plan")}
								{documentUpload("deed", "Deed of Transfer")}
								{documentUpload("obaApproval", "Oba approval")}
								{documentUpload("cOfO", "Certificate of occupancy")}
								{documentUpload("sar", "Site analysis report")}
								{documentUpload("soilTest", "Soil Test")}
								{documentUpload("eia", "Environmental impact analysis")}
								{documentUpload("fireSafety", "Fire safety report")}
								{documentUpload("tax", "Tax clearance")}
								{documentUpload("mechanical", "Mechanical Drawing")}
								{documentUpload("electrical", "Electrical Drawing")}
								{documentUpload("architecture", "Architectural Drawing")}
								{documentUpload("structural", "Structural Drawing")}
							</div>
						</div>
					</div>
					<button
						type="submit"
						className="btn  save-application primary"
						disabled={isLoading}>
						{isLoading ? (
							<CircularProgress
								thickness={5}
								size={20}
								sx={{ color: "white" }}
							/>
						) : (
							"Save Application"
						)}
					</button>
				</div>
			</form>
		</>
	);
}
