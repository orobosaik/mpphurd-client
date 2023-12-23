import { useState } from "react";
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

export default function ApplicationForm() {
	const [isCompany, setIsCompany] = useState(false);
	const [isJoint, setIsJoint] = useState(true);

	const themeColor = getThemeColor();

	const [appData, setAppData] = useState({
		name: "",
		gender: "",
		address: "",
		email: "",
		phone: "",
		phone1: "",
		passport: "",
		cacCertificate: "",
		idCard: "",
	});
	const [repAppData, setRepAppData] = useState({
		name: "",
		gender: "",
		address: "",
		email: "",
		phone: "",
		phone1: "",
		photo: "",
		idPhoto: "",
	});
	const [buildingAppData, setBuildingAppData] = useState({
		name: "",
		plotNo: "",
		address: "",
		region: "",
		lga: "",
		zone: "",
		type: "",
		use: "",
		status: "",
		noOfFloor: "",
		coordinates: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(buildingAppData);
		console.log(e);
		const form = new FormData(e.target);
		// console.log(form.get("plan.PlotNo"));

		const newData = {
			applicant: {
				type: form.get("applicantType"),
				name: form.get("applicantName"),
				gender: form.get("applicantGender"),
				phone: form.get("applicantPhone"),
				phone1: form.get("applicantPhone1"),
				email: form.get("applicantEmail"),
				address: form.get("applicantAddress"),
				photo: form.get("applicantPassport"),
				idCard: form.get("applicantIdCard"),
				cacCertificate: form.get("applicantCacCertificate"),
			},
			rep: {
				name: form.get("repName"),
				gender: form.get("repGender"),
				phone: form.get("repPhone"),
				phone1: form.get("repPhone1"),
				email: form.get("repEmail"),
				address: form.get("repAddress"),
				photo: form.get("repPassport"),
				idCard: form.get("repIdCard"),
			},
			dev: {
				name: form.get("planBuildingName"),
				plotNo: form.get("planPlotNo"),
				address: form.get("planAddress"),
				region: form.get("planRegion"),
				lga: form.get("planLga"),
				zone: form.get("planZone"),
				type: form.get("planBuildingType"),
				use: form.get("planBuildingUse"),
				status: form.get("planBuildingStatus"),
				noOfFloor: form.get("planFloors"),
				coordinates: form.get("planCoordinates"),
			},
		};

		console.log(newData);

		axios.defaults.withCredentials = true;

		try {
			let host = import.meta.env.VITE_SERVER;
			const res = await axios(`${host}/staffs/plan`, {
				method: "post",
				data: newData,
				withCredentials: true,
			});
			// const res = await axios.post(`${host}/staffs/plan`, newData, {
			// 	withCredentials: true,
			// });
			console.log(res.data);

			setTimeout(() => {
				toast.success("Login Successful", {
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
			<div className="applicationItems">
				<div className="applicationItem">
					{/* <div className="applicationItemName"> */}
					<div>
						<label htmlFor={type + "Name"}>
							{isCompany && type !== "rep" ? "Company Name:" : "Full Name:"}
						</label>
						<input type="text" name={type + "Name"} id={type + "Name"} />
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
								/>
							</label>

							<label htmlFor={type + "Gender2"}>
								<span>Male</span>
								<input
									type="radio"
									name={type + "Gender"}
									value="male"
									id={type + "Gender2"}
								/>
							</label>
						</div>
					</div>
				)}
				<div className="applicationItem">
					<label htmlFor={type + "Address"}>
						{isCompany && type !== "rep" ? "Company Address:" : "Address:"}
					</label>
					<input type="text" name={type + "Address"} id={type + "Address"} />
				</div>
				<div className="applicationItem">
					<div className="applicationItemPhone">
						<div>
							<label htmlFor={type + "Phone"}>Phone 1:</label>
							<input type="tel" name={type + "Phone"} id={type + "Phone"} />
						</div>
						<div>
							<label htmlFor={type + "Phone1"}>Phone 2:</label>
							<input type="tel" name={type + "Phone1"} id={type + "Phone1"} />
						</div>
					</div>
				</div>
				<div className="applicationItem">
					<label htmlFor={type + "Email"}>Email:</label>
					<input type="email" name={type + "Email"} id={type + "Email"} />
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
						<label htmlFor={type + "Name"}>Company Name:</label>
						<input type="apl1Text" name={type + "Name"} id={type + "Name"} />
					</div>
				</div>

				<div className="applicationItem">
					<label htmlFor={type + "Address"}>Company Address:</label>
					<input type="text" name={type + "Address"} id={type + "Address"} />
				</div>
				<div className="applicationItem">
					<div className="applicationItemPhone">
						<div>
							<label htmlFor={type + "Phone1"}>Phone 1:</label>
							<input type="tel" name={type + "Phone1"} id={type + "Phone1"} />
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
								name="applicantType"
								id="applicantType"
								onClick={(e) =>
									setIsCompany(e.target.value === "individual" ? false : true)
								}>
								<option value="individual">Individual</option>
								<option value="Company">Company</option>
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
										: "Company Information"}
								</h3>
								<div className="applicantCode">
									<span>Uni Code:</span>
									<input type="text" />
								</div>
							</div>
							{individualApplicationItems("applicant")}
						</div>

						{/* REP INFORMATION */}
						<div className="applicationItemsWrapper">
							<div className="applicationTitle">
								<h3>Representative Information</h3>
							</div>
							{individualApplicationItems("rep")}
						</div>

						{/* BUILDING APPLICATION INFORMATION */}
						<div className="applicationItemsWrapper">
							<div className="applicationTitle">
								<h3>Development Information</h3>
							</div>
							<div className="applicationItems">
								<div className="applicationItem">
									<div>
										<label htmlFor="planBuildingName">Building Name:</label>
										<input
											type="text"
											name="planBuildingName"
											id="planBuildingName"
											value={buildingAppData.name}
											onChange={(e) => {
												let val = e.target.value;
												let newData = {
													...buildingAppData,
												};
												newData.name = val;
												setBuildingAppData(newData);
											}}
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
												value={buildingAppData.plotNo}
												onChange={(e) => {
													let val = e.target.value;
													let newData = {
														...buildingAppData,
													};
													newData.plotNo = val;
													setBuildingAppData(newData);
												}}
											/>
										</div>
										<div>
											<label htmlFor="planAddress">Address:</label>
											<input
												type="text"
												name="planAddress"
												id="planAddress"
												value={buildingAppData.address}
												onChange={(e) => {
													let val = e.target.value;
													let newData = {
														...buildingAppData,
													};
													newData.address = val;
													setBuildingAppData(newData);
												}}
											/>
										</div>
									</div>
								</div>
								<div className="applicationItem">
									<div className="applicationItemLocation">
										<div>
											<label htmlFor="planRegion">Region:</label>
											<input type="text" name="planRegion" id="planRegion" />
										</div>
										<div>
											<label htmlFor="planLga">LGA:</label>
											<input type="text" name="planLga" id="planLga" />
										</div>
										<div>
											<label htmlFor="planZone">Zone:</label>
											<input type="text" name="planZone" id="planZone" />
										</div>
									</div>
								</div>
								<div className="applicationItem">
									<div className="applicationItemType">
										<div>
											<label htmlFor="planBuildingType">Building Type:</label>
											<input
												type="text"
												name="planBuildingType"
												id="planBuildingType"
											/>
										</div>
										<div>
											<label htmlFor="planBuildingUse">Building Use:</label>
											<input
												type="text"
												name="planBuildingUse"
												id="planBuildingUse"
											/>
										</div>
										<div>
											<label htmlFor="planBuildingStatus">
												Building Status:
											</label>
											<select name="planBuildingStatus" id="planBuildingStatus">
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
												type="text"
												name="planFloors"
												id="planFloors"
												value={buildingAppData.noOfFloor}
												onChange={(e) => {
													let val = e.target.value;
													let newData = {
														...buildingAppData,
													};
													newData.noOfFloor = val;
													setBuildingAppData(newData);
												}}
											/>
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
					<button type="sumbit" className="save-application primary">
						Save Application
					</button>
				</div>
			</form>
		</>
	);
}
