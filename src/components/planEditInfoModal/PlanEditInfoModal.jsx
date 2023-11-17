import React, { useEffect, useState } from "react";
import "./planEditInfoModal.css";
import { CloseRounded, EditRounded } from "@mui/icons-material";

export default function PlanEditInfoModal({
	buttonIcon,
	buttonText,
	children,
}) {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
				Edit
			</button>

			{open && (
				<dialog className="modalView">
					<header>
						<span>Edit Plan Info</span>
						<div className="modalViewCloseButton" onClick={handleClose}>
							<CloseRounded className="closeButton" />
						</div>
					</header>

						<div className="currentStackEdit">
							<label htmlFor="planBuildingStatus">Current Stack:</label>
							<select name="planBuildingStatus" id="planBuildingStatus">
								<option value="proposed">Stack A1</option>
								<option value="underConstruction">Stack A2</option>
								<option value="built">Stack A3</option>
							</select>
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

					<footer>
						<button className="primary">Save</button>
					</footer>
				</dialog>
			)}
		</div>
	);
}
