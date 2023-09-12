import { useState } from "react";
import {
	AddPhotoAlternateRounded,
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
	const [isActive, setIsActive] = useState(true);
	const [isManagement, setIsManagement] = useState(false);

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

							<div className="applicationForm">
								<div className="inputStaffHeader">
									<div className="staffImage">
										<label
											htmlFor={"staffMeansOfIdentification"}
											className="uploadImageWrapper">
											<span>
												<AddPhotoAlternateRounded fontSize="large" />
											</span>
											<span>Select Image</span>
											<input
												type="file"
												name={"staffMeansOfIdentification"}
												id={"staffMeansOfIdentification"}
												accept="image/png, image/jpeg, image/jpg"
											/>
										</label>
									</div>
									<div className="inputStaffHeaderRight">
										<div>
											<span>Active Status:</span>
											<ToggleSwitch
												toggled={isActive}
												label={"isActive"}
												onClick={setIsActive}
											/>
										</div>
										<div>
											<span>Management Staff:</span>
											<ToggleSwitch
												toggled={isManagement}
												label={"isManagement"}
												onClick={setIsManagement}
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
														<label htmlFor={"staffTitle"}>Title:</label>
														<input
															type="text"
															name={"staffTitle"}
															id={"staffTitle"}
														/>
													</div>
													<div>
														<label htmlFor={"staffFirstName"}>
															First name:
														</label>
														<input
															type="text"
															name={"staffFirstName"}
															id={"staffFirstName"}
															required
															min={2}
														/>
													</div>
													<div>
														<label htmlFor={"staffSurname"}>Surname:</label>
														<input
															type="text"
															name={"staffSurname"}
															id={"staffSurname"}
															required
															min={2}
														/>
													</div>
													<div>
														<label htmlFor={"staffOtherName"}>
															Other name:
														</label>
														<input
															type="text"
															name={"staffOtherName"}
															id={"staffOtherName"}
															min={2}
														/>
													</div>
													<div>
														<label htmlFor={"staffSuffix"}>Suffix:</label>
														<input
															type="text"
															name={"staffSuffix"}
															id={"staffSuffix"}
														/>
													</div>
												</div>
											</div>

											<div className="applicationItem">
												<label htmlFor={"staffGender"}>Gender:</label>
												<div className="radioBoxWrapper">
													<label htmlFor={"staffGender1"}>
														<span>Female</span>
														<input
															type="radio"
															name="gender"
															value="female"
															id={"staffGender1"}
														/>
													</label>

													<label htmlFor={"staffGender2"}>
														<span>Male</span>
														<input
															type="radio"
															name="gender"
															value="male"
															id={"staffGender2"}
														/>
													</label>
												</div>
											</div>
											<div className="applicationItem">
												<label htmlFor={"staffAddress"}>Address:</label>
												<input
													type="text"
													name={"staffAddress"}
													id={"staffAddress"}
												/>
											</div>
											<div className="applicationItem">
												<div className="applicationItemPhone">
													<div>
														<label htmlFor={"staffPhone1"}>Phone 1:</label>
														<input
															type="tel"
															name={"staffPhone1"}
															id={"staffPhone1"}
														/>
													</div>
													<div>
														<label htmlFor={"staffPhone2"}>Phone 2:</label>
														<input
															type="tel"
															name={"staffPhone1"}
															id={"staffPhone2"}
														/>
													</div>
												</div>
											</div>
											<div className="applicationItem">
												<label htmlFor={"staffOfficialEmail"}>
													Official Email:
												</label>
												<input
													type="email"
													id={"staffOfficialEmail"}
													required
													min={10}
													max={50}
												/>
											</div>
											<div className="applicationItem">
												<label htmlFor={"staffAlternativeEmail"}>
													Alternative Email:
												</label>
												<input
													type="email"
													id={"staffAlternativeEmail"}
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
														<label htmlFor="staffOffice">Position:</label>
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
												<label htmlFor="">Office and Tasks</label>
												<div className="inputStaffOfficeWrapper">
													<div className="inputStaffOfficeList">


														<div className="inputStaffOffice">
															<button>-</button>
															<div>
																<label>Office</label>
																<select name="" id=""></select>
															</div>
															<div>
																<label>Tasks</label>
																<div className="taskList">
																	<span>
																		<input
																			type="checkbox"
																			name="task"
																			id="task"
																		/>
																		<label htmlFor="task">Task 1</label>
																	</span>
																	<span>
																		<input
																			type="checkbox"
																			name="task"
																			id="task"
																		/>
																		<label htmlFor="task">Minute FIle</label>
																	</span>
																	<span>
																		<input
																			type="checkbox"
																			name="task"
																			id="task"
																		/>
																		<label htmlFor="task">Create Plan</label>
																	</span>
																	<span>
																		<input
																			type="checkbox"
																			name="task"
																			id="task"
																		/>
																		<label htmlFor="task">Send File</label>
																	</span>
																	<span>
																		<input
																			type="checkbox"
																			name="task"
																			id="task"
																		/>
																		<label htmlFor="task">
																			Upload Document
																		</label>
																	</span>
																	<span>
																		<input
																			type="checkbox"
																			name="task"
																			id="task"
																		/>
																		<label htmlFor="task">Send Message</label>
																	</span>
																</div>
															</div>
														</div>

													</div>
													<button>+</button>
												</div>
											</div>
										</div>
									</div>
								</div>
								<button className="save-application primary">
									Save Staff
								</button>
							</div>
						</MiddleBar>
					</div>
				</div>
			</div>
		</>
	);
}
