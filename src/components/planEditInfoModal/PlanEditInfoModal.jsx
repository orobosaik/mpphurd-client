import React, { useCallback, useEffect, useState } from "react";
import "./planEditInfoModal.css";
import {
	CloseRounded,
	EditRounded,
	FileUploadRounded,
} from "@mui/icons-material";

export default function PlanEditInfoModal({
	buttonIcon,
	buttonText,
	children,
}) {
	const [open, setOpen] = useState(false);
	const [assessment, setAssessment] = useState(false);
	const [clearing, setClearing] = useState(true);
	const [archive, setArchive] = useState(false);

	const [collectedApproval, setCollectedApproval] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const individualApplicationItems = (type) => {
		return (
			<div className="applicationItemsWrapper">
				<div className="applicationTitle">
					<h3>Applicant Information</h3>
				</div>

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
								<input
									type="text"
									name={type + "Suffix"}
									id={type + "Suffix"}
								/>
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
					{!clearing && (
						<div className="currentStackEdit">
							<label htmlFor="planBuildingStatus">Current Stack:</label>
							<select name="planBuildingStatus" id="planBuildingStatus">
								<option value="proposed">Stack A1</option>
								<option value="underConstruction">Stack A2</option>
								<option value="built">Stack A3</option>
							</select>
						</div>
					)}
					{archive && (
						<>
							<div className="minuteItem">
								<label htmlFor="minuteText">Description:</label>
								<textarea
									name="minuteText"
									id="minuteText"
									cols="30"
									rows="10"></textarea>
							</div>
							<div className="currentStackEdit">
								<label htmlFor="planBuildingStatus">Has Tax:</label>
								<select name="planBuildingStatus" id="planBuildingStatus">
									<option value="no">No</option>
									<option value="yes">Yes</option>
								</select>
							</div>
							<div className="currentStackEdit">
								<label htmlFor="collectedApproval">Collected Approval:</label>
								<select
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
										type="date"
										name="collectedApprovalDate"
										id="collectedApprovalDate"
									/>
								</div>
							)}
						</>
					)}
					{assessment && (
						<div className="planEditInfoTags">
							<h4>Tags:</h4>

							<div className="planEditInfoTagsOptions">
								<div>
									<label htmlFor="fastTrack">Fast Track</label>
									<input type="checkbox" name="fastTrack" id="fastTrack" />
								</div>

								<div>
									<label htmlFor="oldFile">Old File</label>
									<input type="checkbox" name="oldFile" id="oldFile" />
								</div>

								<div>
									<label htmlFor="fileOfInterest">File Of Interest</label>
									<input
										type="checkbox"
										name="fileOfInterest"
										id="fileOfInterest"
									/>
								</div>
							</div>
						</div>
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
											<input type="text" name="planFloors" id="planFloors" />
										</div>
										<div>
											<label htmlFor="planCoordinate">
												Survey Coordinates:
											</label>
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
					) : (
						""
					)}
					<footer>
						<button className="primary">Save</button>
					</footer>
				</dialog>
			)}
		</div>
	);
}
