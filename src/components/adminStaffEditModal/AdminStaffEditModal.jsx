import "./adminStaffEditModal.css";
import {
	AddPhotoAlternateRounded,
	FileUploadRounded,
	Image,
	UploadFileRounded,
} from "@mui/icons-material";
import ToggleSwitch from "../toggleSwitch/ToggleSwitch";
import React, { useCallback, useEffect, useState } from "react";
import { CloseRounded, EditRounded } from "@mui/icons-material";

// return (
// 	<div>
// 		<button className="modalTrigger" onClick={handleOpen}>
// 			<EditRounded className="editIcon" />
// 			{archive ? "Update" : "Edit"}
// 		</button>

// 		{open && (
// 			<dialog className="modalView">
// 				<header>
// 					<span>Edit Plan Info</span>
// 					<div className="modalViewCloseButton" onClick={handleClose}>
// 						<CloseRounded className="closeButton" />
// 					</div>
// 				</header>
// 				{!clearing && (
// 					<div className="currentStackEdit">
// 						<label htmlFor="planBuildingStatus">Current Stack:</label>
// 						<select name="planBuildingStatus" id="planBuildingStatus">
// 							<option value="proposed">Stack A1</option>
// 							<option value="underConstruction">Stack A2</option>
// 							<option value="built">Stack A3</option>
// 						</select>
// 					</div>
// 				)}
// 				{archive && (
// 					<>
// 						<div className="minuteItem">
// 							<label htmlFor="minuteText">Description:</label>
// 							<textarea
// 								name="minuteText"
// 								id="minuteText"
// 								cols="30"
// 								rows="10"></textarea>
// 						</div>
// 						<div className="currentStackEdit">
// 							<label htmlFor="planBuildingStatus">Has Tax:</label>
// 							<select name="planBuildingStatus" id="planBuildingStatus">
// 								<option value="no">No</option>
// 								<option value="yes">Yes</option>
// 							</select>
// 						</div>
// 						<div className="currentStackEdit">
// 							<label htmlFor="collectedApproval">Collected Approval:</label>
// 							<select
// 								name="collectedApproval"
// 								id="collectedApproval"
// 								onChange={(e) => {
// 									setCollectedApproval(e.target.value == "yes" ? true : false);
// 								}}>
// 								<option value="no">No</option>
// 								<option value="yes">Yes</option>
// 							</select>
// 						</div>
// 						{collectedApproval && (
// 							<div className="currentStackEdit">
// 								<label htmlFor="collectedApprovalDate">Collection Date:</label>
// 								<input
// 									type="date"
// 									name="collectedApprovalDate"
// 									id="collectedApprovalDate"
// 								/>
// 							</div>
// 						)}
// 					</>
// 				)}
// 				{assessment && (
// 					<div className="planEditInfoTags">
// 						<h4>Tags:</h4>

// 						<div className="planEditInfoTagsOptions">
// 							<div>
// 								<label htmlFor="fastTrack">Fast Track</label>
// 								<input type="checkbox" name="fastTrack" id="fastTrack" />
// 							</div>

// 							<div>
// 								<label htmlFor="oldFile">Old File</label>
// 								<input type="checkbox" name="oldFile" id="oldFile" />
// 							</div>

// 							<div>
// 								<label htmlFor="fileOfInterest">File Of Interest</label>
// 								<input
// 									type="checkbox"
// 									name="fileOfInterest"
// 									id="fileOfInterest"
// 								/>
// 							</div>
// 						</div>
// 					</div>
// 				)}
// 				{/* APPLICANT INFORMATION */}
// 				{clearing && individualApplicationItems("applicant")}
// 				{/* BUILDING APPLICATION INFORMATION */}
// 				{clearing || assessment ? (
// 					<div className="applicationItemsWrapper">
// 						<div className="applicationTitle">
// 							<h3>Development Information</h3>
// 						</div>
// 						<div className="applicationItems">
// 							<div className="applicationItem">
// 								<div>
// 									<label htmlFor="planBusinessName">Building Name:</label>
// 									<input
// 										type="text"
// 										name="planBusinessName"
// 										id="planBusinessName"
// 									/>
// 								</div>
// 							</div>
// 							<div className="applicationItem">
// 								<div className="applicationItemAddressModal">
// 									<div>
// 										<label htmlFor="planPlotNo">Plot No:</label>
// 										<input type="text" name="planPlotNo" id="planPlotNo" />
// 									</div>
// 									<div>
// 										<label htmlFor="planAddress">Address:</label>
// 										<input type="text" name="planAddress" id="planAddress" />
// 									</div>
// 								</div>
// 							</div>
// 							<div className="applicationItem">
// 								<div className="applicationItemLocation">
// 									<div>
// 										<label htmlFor="planRegion">Region:</label>
// 										<input type="text" name="planRegion" id="planRegion" />
// 									</div>
// 									<div>
// 										<label htmlFor="planLga">LGA:</label>
// 										<input type="text" name="planLga" id="planLga" />
// 									</div>
// 									<div>
// 										<label htmlFor="planZone">Zone:</label>
// 										<input type="text" name="planZone" id="planZone" />
// 									</div>
// 								</div>
// 							</div>
// 							<div className="applicationItem">
// 								<div className="applicationItemType">
// 									<div>
// 										<label htmlFor="planBuildingType">Building Type:</label>
// 										<input
// 											type="text"
// 											name="planBuildingType"
// 											id="planBuildingType"
// 										/>
// 									</div>
// 									<div>
// 										<label htmlFor="planBuildingUse">Building Use:</label>
// 										<input
// 											type="text"
// 											name="planBuildingUse"
// 											id="planBuildingUse"
// 										/>
// 									</div>
// 									<div>
// 										<label htmlFor="planBuildingStatus">Building Status:</label>
// 										<select name="planBuildingStatus" id="planBuildingStatus">
// 											<option value="proposed">Proposed</option>
// 											<option value="underConstruction">
// 												Under Construction
// 											</option>
// 											<option value="built">Built</option>
// 										</select>
// 									</div>
// 								</div>
// 							</div>
// 							<div className="applicationItem">
// 								<div className="applicationItemType">
// 									<div>
// 										<label htmlFor="planFloors">No of Floors:</label>
// 										<input type="text" name="planFloors" id="planFloors" />
// 									</div>
// 									<div>
// 										<label htmlFor="planCoordinate">Survey Coordinates:</label>
// 										<input
// 											type="text"
// 											name="planCoordinate"
// 											id="planCoordinate"
// 										/>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				) : (
// 					""
// 				)}
// 				<footer>
// 					<button className="primary">Save</button>
// 				</footer>
// 			</dialog>
// 		)}
// 	</div>
// );

export default function AdminStaffEditModal({ ...props }) {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
		const modal = document.querySelector(".adminStaffEditModal");
		if (modal) {
			open ? modal.showModal() : modal.close();
		}
		return () => {};
	}, [open]);

	const [isActive, setIsActive] = useState(true);
	const [isManagement, setIsManagement] = useState(false);

	const [photo, setPhoto] = useState(null);
	const [clearPhotoButton, setClearPhotoButton] = useState(true);

	const onPhotoChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			setPhoto(URL.createObjectURL(event.target.files[0]));
			console.log(URL.createObjectURL(event.target.files[0]));
		}
	};


	return (
		<>
			<button className={props.buttonClass} onClick={handleOpen}>
				{props.buttonIcon}
				{props.buttonName}
			</button>

			{open && (
				<dialog className="modalView adminStaffEditModal ">
					<header>
						<span>Staff Info</span>

						<div className="modalViewCloseButton" onClick={handleClose}>
							<CloseRounded className="closeButton" />
						</div>
					</header>

					<div className="inputStaffHeader">
						<div
							className="staffImage"
							onMouseEnter={() => setClearPhotoButton(true)}
							onMouseLeave={() => setClearPhotoButton(false)}>
							{(clearPhotoButton && photo) && (
								<div className="clearPhotoButton">
									<CloseRounded className="clearPhotoIcon" onClick={() => setPhoto(null)} />
								</div>
							)}
							<label
								htmlFor={"staffMeansOfIdentification"}
								className="uploadImageWrapper">
								{photo ? (
									<img src={photo} alt="" />
								) : (
									<div>
										<span>
											<AddPhotoAlternateRounded fontSize="large" />
										</span>
										<span>Select Image</span>
									</div>
								)}
								<input
									type="file"
									name={"staffMeansOfIdentification"}
									id={"staffMeansOfIdentification"}
									accept="image/png, image/jpeg, image/jpg"
									onChange={onPhotoChange}
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
					<div className="applicationForm">
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
												<label htmlFor={"staffFirstName"}>First name:</label>
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
												<label htmlFor={"staffOtherName"}>Other name:</label>
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
										<div className="applicationItemEmail">
											<div>
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
											<div>
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
										</div>
									</div>

									<div className="applicationItem">
										<div className="applicationItemLocation">
											<div>
												<label htmlFor="staffDesignation">Designation:</label>
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
																<input type="checkbox" name="task" id="task" />
																<label htmlFor="task">Task 1</label>
															</span>
															<span>
																<input type="checkbox" name="task" id="task" />
																<label htmlFor="task">Minute FIle</label>
															</span>
															<span>
																<input type="checkbox" name="task" id="task" />
																<label htmlFor="task">Create Plan</label>
															</span>
															<span>
																<input type="checkbox" name="task" id="task" />
																<label htmlFor="task">Send File</label>
															</span>
															<span>
																<input type="checkbox" name="task" id="task" />
																<label htmlFor="task">Upload Document</label>
															</span>
															<span>
																<input type="checkbox" name="task" id="task" />
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
					</div>
					<footer>
						<button className="primary">Save</button>
					</footer>
				</dialog>
			)}
		</>
	);
}
