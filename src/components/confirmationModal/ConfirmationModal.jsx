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

	const handleSubmit = async () => {
		try {
			let host = import.meta.env.VITE_SERVER;
			const res = await onSubmitFunction();

			// setData(res.data);
			// setIsLoading(false);
			// console.log(res.data);
			toast.error(res.data, {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: themeColor,
			});
			setOpen(false);
		} catch (error) {
			let message = error.response
				? error.response.data.message
				: error.message;
			// console.log(error);
			// console.log(message);
			setTimeout(() => {
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
			}, 0);
		}
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
