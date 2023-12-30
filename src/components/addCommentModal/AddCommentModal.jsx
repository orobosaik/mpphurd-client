import React, { useCallback, useEffect, useState } from "react";
import "./addCommentModal.css";
import {
	CloseRounded,
	EditRounded,
	FileUploadRounded,
} from "@mui/icons-material";

export default function AddCommentModal({
	buttonIcon,
	buttonText,
	children,
	data,
}) {
	const [open, setOpen] = useState(false);
	const [assessment, setAssessment] = useState(false);
	const [clearing, setClearing] = useState(true);
	const [archive, setArchive] = useState(false);

	const [collectedApproval, setCollectedApproval] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(e)
	}

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
		const modal = document.querySelector(".modalView");
		if (modal) {
			open ? modal.showModal() : modal.close();
		}
	}, [open]);

	return (
		<div>
			<div>
				<button className="modalTrigger" onClick={handleOpen}>
					Add Comment
				</button>
			</div>

			{open && (
				<dialog className="modalView">
					<header>
						<span>Plan Info - {data?.planNo || data?.uniqueId}</span>
						<div className="modalViewCloseButton" onClick={handleClose}>
							<CloseRounded className="closeButton" />
						</div>
					</header>

					<form action="" onSubmit={handleSubmit}>
						<div className="applicationItemsWrapper">
							<div className="applicationTitle">
								<h3>Add Comment</h3>
							</div>

							<div>
								<div className="minuteItems">
									<div className="minuteItem">
										<label htmlFor="minuteStatus">Status:</label>
										<select name="minuteStatus" id="minuteStatus">
											<option value="">...</option>
											<option value="clear">Action Taken</option>
											<option value="issue">Issue Raised</option>
											<option value="reject">Pending Action</option>
										</select>
									</div>

									<div className="minuteItem">
										<label htmlFor="minuteText">Comment:</label>
										<textarea
											name="minuteText"
											id="minuteText"
											cols="30"
											rows="10"></textarea>
									</div>
								</div>
							</div>
						</div>
						<footer>
							<button type="submit" className="primary">
								Save
							</button>
						</footer>
					</form>
				</dialog>
			)}
		</div>
	);
}
