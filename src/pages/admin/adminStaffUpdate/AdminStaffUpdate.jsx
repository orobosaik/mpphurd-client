import { useState } from "react";
import {
	FileUploadRounded,
	Image,
	UploadFileRounded,
} from "@mui/icons-material";
import "./adminStaffUpdate.css";
import ToggleSwitch from "../../../components/toggleSwitch/ToggleSwitch";
import MiddleBar from "../../../components/middleBar/MiddleBar";
import ListWrapper from "../../../components/listWrapper/ListWrapper";
import AdminHeader from "../../../components/adminHeader/AdminHeader";
import AdminSideBar from "../../../components/adminSideBar/AdminSideBar";
import ListCardContainer from "../../../components/listCardContainer/ListCardContainer";
import ListCard from "../../../components/listCard/ListCard";
import { ExpandMoreRounded, PersonAddRounded } from "@mui/icons-material";
import AdminStaffListCard from "../../../components/adminStaffListCard/AdminStaffListCard";
import { Link } from "react-router-dom";

export default function AdminStaffUpdate() {
	const [isCompany, setIsCompany] = useState(false);
	const [isJoint, setIsJoint] = useState(true);

	const individualApplicationItems = (type) => {
		return (
			<div className="applicationItems">
				<div className="applicationItem">
					<div className="applicationItemName">
						<div>
							<label htmlFor={type + "Title"}>Title:</label>
							<input type="text" name={type + "Title"} id={type + "Title"} />
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
			<div className="pageWrapper"></div>

			<div className="Office">
				<AdminHeader />
				<div className="OfficeWrapper">
					<div className="OfficeSideBar">
						<AdminSideBar selected={"office"} />
					</div>

					<div className="OfficeMiddleBar">
						<MiddleBar
							topBarData={{
								action: "Add New Staff",
							}}>
							{/*

		profilePicture: {
			type: String,
		},
		coverPicture: {
			type: String,
		},

		jobTitle: {
			full: {
				type: String,
			},
			short: {
				type: String,
			},
		},

		task: {
			type: Array,
			default: [],
		},

		isAdmin: {
			type: Boolean,
			default: false,
		},

		isStaff: {
			type: Boolean,
			default: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		}, */}

							<div className="applicationForm">
								<div className="applicationHeader">
									<div className="staffImage">
										<label
											htmlFor={"Staff MeansOfIdentification"}
											className="uploadImageWrapper">
											<span>
												<FileUploadRounded />
											</span>
											<span>Select Image</span>
											<input
												type="file"
												name={"Staff MeansOfIdentification"}
												id={"Staff MeansOfIdentification"}
												accept="image/png, image/jpeg, image/jpg"
											/>
										</label>
									</div>
									<div>
										<div>
											<span>Joint Application:</span>
											<ToggleSwitch
												toggled={isJoint}
												label={"isJointApplication"}
												onClick={setIsJoint}
											/>
										</div>
										<div>
											<span>Joint Application:</span>
											<ToggleSwitch
												toggled={isJoint}
												label={"isJointApplication"}
												onClick={setIsJoint}
											/>
										</div>
									</div>
								</div>

								<div className="applicationInputWrapper">
									<div className="applicationItemsWrapper">
										<div className="applicationTitle">
											<h3>Staff Personal Information</h3>
										</div>
										<div className="applicationItems">
											<div className="applicationItem">
												<div className="applicationItemName">
													<div>
														<label htmlFor={"Staff Title"}>Title:</label>
														<input
															type="text"
															name={"Staff Title"}
															id={"Staff Title"}
														/>
													</div>
													<div>
														<label htmlFor={"Staff FirstName"}>
															First name:
														</label>
														<input
															type="text"
															name={"Staff FirstName"}
															id={"Staff FirstName"}
															required
															min={2}
														/>
													</div>
													<div>
														<label htmlFor={"Staff Surname"}>Surname:</label>
														<input
															type="text"
															name={"Staff Surname"}
															id={"Staff Surname"}
															required
															min={2}
														/>
													</div>
													<div>
														<label htmlFor={"Staff OtherName"}>
															Other name:
														</label>
														<input
															type="text"
															name={"Staff OtherName"}
															id={"Staff OtherName"}
															min={2}
														/>
													</div>
													<div>
														<label htmlFor={"Staff Suffix"}>Suffix:</label>
														<input
															type="text"
															name={"Staff Suffix"}
															id={"Staff Suffix"}
														/>
													</div>
												</div>
											</div>

											<div className="applicationItem">
												<label htmlFor={"Staff Gender"}>Gender:</label>
												<div className="radioBoxWrapper">
													<label htmlFor={"Staff Gender1"}>
														<span>Female</span>
														<input
															type="radio"
															name="gender"
															value="female"
															id={"Staff Gender1"}
														/>
													</label>

													<label htmlFor={"Staff Gender2"}>
														<span>Male</span>
														<input
															type="radio"
															name="gender"
															value="male"
															id={"Staff Gender2"}
														/>
													</label>
												</div>
											</div>
											<div className="applicationItem">
												<label htmlFor={"Staff Address"}>Address:</label>
												<input
													type="text"
													name={"Staff Address"}
													id={"Staff Address"}
												/>
											</div>
											<div className="applicationItem">
												<div className="applicationItemPhone">
													<div>
														<label htmlFor={"Staff Phone1"}>Phone 1:</label>
														<input
															type="tel"
															name={"Staff Phone1"}
															id={"Staff Phone1"}
														/>
													</div>
													<div>
														<label htmlFor={"Staff Phone2"}>Phone 2:</label>
														<input
															type="tel"
															name={"Staff Phone1"}
															id={"Staff Phone2"}
														/>
													</div>
												</div>
											</div>
											<div className="applicationItem">
												<label htmlFor={"Staff Email"}>Email:</label>
												<input
													type="email"
													id={"Staff Email"}
													required
													min={10}
													max={50}
												/>
											</div>
											<div className="applicationItem">
												<div className="applicationItemLocation">
													<div>
														<label htmlFor="staffDesignation">
															Designation:
														</label>
														<input
															type="text"
															name="staffDesignation"
															id="staffDesignation"
														/>
													</div>
													<div>
														<label htmlFor="staffOffice">Office:</label>
														<select name="staffOffice" id="staffOffice">
															<option value="proposed">Proposed</option>
															<option value="underConstruction">
																Under Construction
															</option>
															<option value="built">Built</option>
														</select>
													</div>
													<div>
														<label htmlFor="staffRegion">Region:</label>
														<select name="staffRegion" id="staffRegion">
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
												<div className="applicationItemLocation">
													<div>
														<label htmlFor="staffPosition">Position:</label>
														<input
															type="text"
															name="staffPosition"
															id="staffPosition"
														/>
													</div>
													<div>
														<label htmlFor="staffManagementStatus">
															Management Staff:
														</label>
														<select
															name="staffManagementStatus"
															id="staffManagementStatus">
															<option value="yes">Yes</option>
															<option value="no">No</option>
														</select>
													</div>
													<div>
														<label htmlFor="staffRegion">Region:</label>
														<select name="staffRegion" id="staffRegion">
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
												<label htmlFor={"Staff MeansOfIdentification"}>
													Select Means of identification:
												</label>
												<label
													htmlFor={"Staff MeansOfIdentification"}
													className="uploadFileWrapper">
													<span>
														<FileUploadRounded />
														Upload File
													</span>
													<input
														type="file"
														name={"Staff MeansOfIdentification"}
														id={"Staff MeansOfIdentification"}
														accept="image/png, image/jpeg, image/jpg"
													/>
												</label>
											</div>
											<div className="applicationItem">
												<label htmlFor={"Staff Passport"}>
													Select passport:
												</label>
												<label
													htmlFor={"Staff Passport"}
													className="uploadFileWrapper">
													<span>
														<FileUploadRounded />
														Upload File
													</span>
													<input
														type="file"
														name={"Staff Passport"}
														id={"Staff Passport"}
														accept="image/png, image/jpeg, image/jpg"
													/>
												</label>
											</div>
										</div>
									</div>


								</div>
								<button className="save-application primary">
									Save Application
								</button>
							</div>
						</MiddleBar>
					</div>
				</div>
			</div>
		</>
	);
}
