import React, { useCallback, useEffect, useState } from "react";
import "./activityCardModal.css";
import {
	CloseRounded,
	EditRounded,
	ExpandLessRounded,
	FileUploadRounded,
	LaunchRounded,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";
import { getThemeColor } from "../../utilities/themeColor";
import { CircularProgress } from "@mui/material";
import ActivityCard from "../activityCard/ActivityCard";
import { format } from "date-fns";

export default function ActivityCardModal({
	buttonIcon,
	buttonText,
	className,
	children,
	stateData,
}) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(stateData);

	const themeColor = getThemeColor();

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

	const getGreetingDate = () => {
		// Get the current time
		const currentTime = new Date();
		// Format the current date
		const formattedDate = format(currentTime, "EEEE, MMMM do, yyyy");
		return `${formattedDate}`;
	};

	return (
		<div>
			{buttonText ? (
				<button className={className} onClick={handleOpen}>
					{buttonText}
				</button>
			) : (
				<div
					className="modalTrigger activityCardViewMoreIcon"
					onClick={handleOpen}>
					<LaunchRounded />
				</div>
			)}

			{open && (
				<dialog className="modalView activityCardModal">
					<header>
						<span>Activities View</span>
						<div className="modalViewCloseButton" onClick={handleClose}>
							<CloseRounded className="closeButton" />
						</div>
					</header>

					<div className="activityCardModalWrapper">
						<div className="head">
							<h3 className={`${data.type} minuteType`}>{data.type}</h3>
							<div className="date">
								{format(data.createdAt, "EEEE, MMMM do, yyyy")}
								{` at ${format(data.createdAt, "HH:mm")}`}
							</div>
						</div>

						{/*  */}

						<div className="activityCardHead">
							<h2 className="action">
								{data.type === "Minute" ? "File Minuted" : data.title}
							</h2>
						</div>

						{data?.to?.office && (
							<>
								<div className="title">To:</div>
								<div className="card">
									<span className="text">{`${data.to.office}`}</span>
									<span className="text">
										{(data.to.staff !== "Unavailable" ||
											data.to.staff !== "Multiple staff") &&
											`${data.to.staff}`}
									</span>
								</div>
							</>
						)}
						{data?.from?.office && (
							<>
								<div className="title">From:</div>
								<div className="card">
									<span className="text">{`${data.from.office}`}</span>
									<span className="text">
										{data.from.staff && `${data.from.staff}`}
									</span>
								</div>
							</>
						)}
						{data?.by?.office && (
							<>
								<div className="title">By:</div>
								<div className="card">
									<span className="text">{`${data.by.office}`}</span>
									<span className="text">
										{data.by.staff && `${data.by.staff}`}
									</span>
								</div>
							</>
						)}
						{data?.through?.office && (
							<>
								<div className="title">Through:</div>
								<div className="card">
									<span className="text">{`${data.through.office}`}</span>
									<span className="text">
										{data.through.staff && `${data.through.staff}`}
									</span>
								</div>
							</>
						)}
						{data?.comment?.status && (
							<>
								<div className="title">Status:</div>
								<div className="card">
									<span className="text">{`${data.comment.status}`}</span>
								</div>
							</>
						)}
						{/* Show comment if available */}
						{data?.comment?.text && (
							<>
								<div className="title">Comment:</div>
								<div className="card comment">
									<span className="text ">{`${data.comment.text}`}</span>
								</div>
							</>
						)}
						{data?.type === "Minute" && (
							<>
								<div className="title dio">{`DIO: 45 days`}</div>
							</>
						)}
					</div>
				</dialog>
			)}
		</div>
	);
}
