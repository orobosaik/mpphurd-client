import React, { useCallback, useEffect, useState } from "react";
import "./generatePlanNoModal.css";
import { CloseRounded } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { getThemeColor } from "../../utilities/themeColor";
import { useDispatch } from "react-redux";
import { resetOfficeData } from "../../redux/appSlice";

export default function GeneratePlanNoModal({
	buttonIcon,
	buttonText,
	headerText,
	title,
	body,
	reload,
}) {
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const themeColor = getThemeColor();

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			let host = import.meta.env.VITE_SERVER;
			const res = await axios.get(
				`${host}/staffs/plan/${params.id}/generate_id`,
				{
					withCredentials: true,
				}
			);

			// console.log(res.data);

			// setIsLoading(false);
			reload(() => []);
			// setOpen(false);
			// navigate(-1)
			dispatch(resetOfficeData());
			// console.log(res.data);

			setTimeout(() => {
				toast.success(res.data, {
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
		setIsLoading(false);
		setOpen(false);
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
						<button
							disabled={isLoading}
							onClick={handleSubmit}
							className="primary">
							{isLoading ? (
								<CircularProgress
									thickness={5}
									size={20}
									sx={{ color: "white" }}
								/>
							) : (
								"Okay"
							)}
						</button>

						<button
							disabled={isLoading}
							className="secondary"
							onClick={handleClose}>
							Cancel
						</button>
					</footer>
				</dialog>
			)}
		</div>
	);
}
