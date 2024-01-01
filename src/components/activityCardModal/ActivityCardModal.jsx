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

export default function ActivityCardModal({
	buttonIcon,
	buttonText,
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

	return (
		<div>
			<div
				className="modalTrigger activityCardViewMoreIcon"
				onClick={handleOpen}>
				<LaunchRounded />
			</div>

			{open && (
				<dialog className="modalView activityCardModal">
					<header>
						<span>Activities View - {data?.type}</span>
						<div className="modalViewCloseButton" onClick={handleClose}>
							<CloseRounded className="closeButton" />
						</div>
					</header>

					<div className="applicationItemsWrapper">
						<div className="applicationTitle">
							<h3></h3>
						</div>

						<div>
							<div className="activityCardArrow"></div>
							<h1>
								{" "}
								<span className="activityCardTypeTag">{data.type}</span>
							</h1>

							<div className="activityCardHead">
								<h2 className="title">
									{data.type === "Action" ? data.title : data.to?.office}
								</h2>
								<div className="date">15 Days Ago</div>
							</div>

							{data?.to?.staff && <p>{data.to.staff}</p>}

							{data?.from?.staff && (
								<div>
									<span className="activityCardTitle">From:</span>
									<span className="activityCardText">{`${data.from.office} (${data.from.staff})`}</span>
								</div>
							)}
							{data?.by?.staff && (
								<div>
									<span className="activityCardTitle">By:</span>
									<span className="activityCardText">{`${data.by.office} (${data.by.staff})`}</span>
								</div>
							)}
							{data?.from?.staff && (
								<div>
									<span className="activityCardTitle">DIO:</span>{" "}
									<span className="activityCardText">45 Days</span>
								</div>
							)}

							{data?.comment?.status && (
								<div>
									<span className="activityCardTitle">Status:</span>{" "}
									<span className="activityCardText">
										{data?.comment?.status}
									</span>
								</div>
							)}

							{/* Show comment if available */}
							<div className="activityCardComment">
								{data?.comment?.text && (
									<div className="activityCardCommentButton">
										<span>Comment</span>
										<p className="activityCardCommentText">
											{data?.comment?.text}
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</dialog>
			)}
		</div>
	);
}
