import "./adminOfficeEditModal.css";
import {
	AddPhotoAlternateRounded,
	FileUploadRounded,
	Image,
	UploadFileRounded,
} from "@mui/icons-material";
import ToggleSwitch from "../toggleSwitch/ToggleSwitch";
import React, { useCallback, useEffect, useState } from "react";
import { CloseRounded, EditRounded } from "@mui/icons-material";

export default function AdminOfficeEditModal({ ...props }) {
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
		const modal = document.querySelector(".adminOfficeEditModal");
		if (modal) {
			open ? modal.showModal() : modal.close();
		}
		return () => {};
	}, [open]);

	const [isActive, setIsActive] = useState(true);
	const [isManagement, setIsManagement] = useState(false);

	const [photo, setPhoto] = useState(null);
	const [clearPhotoButton, setClearPhotoButton] = useState(false);

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
				<dialog className="modalView adminOfficeEditModal ">
					<header>
						<span>
							{props.modalType === "add"
								? "Create New Office"
								: props.modalType === "edit"
								? "Edit Office Info"
								: ""}
						</span>

						<div className="modalViewCloseButton" onClick={handleClose}>
							<CloseRounded className="closeButton" />
						</div>
					</header>

					<div className="applicationForm">
						<div className="applicationInputWrapper">
							<div className="applicationItemsWrapper">
								<div className="applicationTitle">
									<h3>Staff Personal Information</h3>
								</div>
								<div className="applicationItems">
									<div className="applicationItem">
										<label htmlFor={"officeName"}>Office Name:</label>
										<input type="text" name={"officeName"} id={"officeName"} />
									</div>

									<div className="applicationItem">
										<label htmlFor={"officeName"}>Officer In Charge:</label>
										<input type="text" name={"officeName"} id={"officeName"} />
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
