import { useState } from "react";
import {
	FileUploadRounded,
	Image,
	UploadFileRounded,
} from "@mui/icons-material";
import "./applicationForm.css";
import ToggleSwitch from "../toggleSwitch/ToggleSwitch";

export default function ApplicationForm() {
	const [isCompany, setIsCompany] = useState(false);
	const [isJoint, setIsJoint] = useState(true);

	const [indivAppData, setIndivAppData] = useState({
		name: "",
		address: "",
		email: "",
		phone: "",
		phone1: "",
		photo: "",
	})




	const individualApplicationItems = (type) => {
		return (
			<div className="applicationItems">
				<div className="applicationItem">
					<div className="applicationItemName">
						<div>
							<label htmlFor={type + "Title"}>Title:</label>
							<input
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
							<input type="text" name={type + "Suffix"} id={type + "Suffix"} />
						</div>
					</div>
				</div>

				<div className="applicationItem">
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
				</div>
				<div className="applicationItem">
					<label htmlFor={type + "Address"}>Address:</label>
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
				</div>
				<div className="applicationItem">
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
				</div>
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

					{!isCompany && (
						<div>
							<span>Joint Application:</span>
							<ToggleSwitch
								toggled={isJoint}
								label={"isJointApplication"}
								onClick={setIsJoint}
							/>
						</div>
					)}
				</div>

				<div className="applicationInputWrapper">
					<div className="applicationItemsWrapper">
						<div className="applicationTitle">
							<h3>
								{" "}
								{!isCompany && isJoint
									? "Applicant-1 Personal Information"
									: !isCompany && !isJoint
									? "Applicant Personal Information"
									: "Company Information"}
							</h3>
							<div className="applicantCode">
								<span>Uni Code:</span>
								<input type="text" />
							</div>
						</div>
						{!isCompany
							? individualApplicationItems("apl1")
							: companyApplicationItems("company")}
					</div>

					{!isCompany && isJoint && (
						<div className="applicationItemsWrapper">
							<div className="applicationTitle">
								<h3>Applicant-2 Personal Information</h3>
							</div>
							{individualApplicationItems("apl2")}
						</div>
					)}

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
									<label htmlFor="planBusinessName">Building Name:</label>
									<input
										type="text"
										name="planBusinessName"
										id="planBusinessName"
									/>
								</div>
							</div>
							<div className="applicationItem">
								<div className="applicationItemAddress">
									<div>
										<label htmlFor="planPlotNo">Plot No:</label>
										<input type="text" name="planPlotNo" id="planPlotNo" />
									</div>
									<div>
										<label htmlFor="planAddress">Address:</label>
										<input type="text" name="planAddress" id="planAddress" />
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
										<label htmlFor="planBuildingStatus">Building Status:</label>
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
										<input type="text" name="planFloors" id="planFloors" />
									</div>
									<div>
										<label htmlFor="planCoordinate">Survey Coordinates:</label>
										<input
											type="text"
											name="planCoordinate"
											id="planCoordinate"
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
				<button className="save-application primary">Save Application</button>
			</div>
		</>
	);
}
