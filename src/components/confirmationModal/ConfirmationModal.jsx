import React, { useCallback, useEffect, useState } from "react";
import "./confirmationModal.css";
import { CloseRounded } from "@mui/icons-material";

export default function ConfirmationModal({
	buttonIcon,
	buttonText,
	headerText,
	title,
	body,
	onSubmitFunction,
}) {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleSubmit = () => {
		setOpen(false);
		onSubmitFunction();
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
				{/* <EditRounded className="editIcon" /> */}
				{buttonText}
			</button>

			{open && (
				<dialog className="modalView confirmationModal">
					<header>
						<span>{headerText}</span>
						<div className="modalViewCloseButton" onClick={handleClose}>
							<CloseRounded className="closeButton" />
						</div>
					</header>

					<div className="applicationTitle">
						<h3>{title}</h3>
					</div>

					<p>{body}</p>

					<footer>
						<button className="primary" onClick={handleSubmit}>
							Okay
						</button>
						<button className="secondary" onClick={handleClose}>
							Cancel
						</button>
					</footer>
				</dialog>
			)}
		</div>
	);
}
