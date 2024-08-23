import React, { useCallback, useEffect, useRef, useState } from "react";
import "./vettingCardAddModal.css";
import {
	CloseRounded,
	EditRounded,
	ErrorRounded,
	FileUploadRounded,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";
import { getThemeColor } from "../../utilities/themeColor";
import { CircularProgress } from "@mui/material";
import {
	COMMENT_STATUS_LIST,
	VETTING_STATUS_LIST,
} from "../../utilities/appData";
import TextEditor from "../../widgets/textEditor/TextEditor";
import { fetchInstance } from "../../utilities/fetcher";

function VettingCardAddModal({
	buttonIcon,
	buttonText,
	children,
	data,
	reload,
	reloadActivities,
	isCleared,
	type,
}) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const themeColor = getThemeColor();

	const [contentValue, setContentValue] = useState();
	const editorRef1 = useRef();

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setLoading(false);
		const content = editorRef1.current.getContent(); // Get content from the editor
		setContentValue(content);
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = new FormData(e.target);
		// console.log(form);
		const content = editorRef1.current.getContent(); // Get content from the editor
		if (!content) {
			setTimeout(() => {
				toast.error("Cannot save without a comment!", {});
			}, 200);
			return;
		}

		const newData = {
			status: form.get("minuteStatus"),
			text: content,
			type: type,
		};
		// console.log(newData);
		// console.log(data)

		try {
			setLoading(true);
			const res = await fetchInstance.post(
				`/staffs/plan/${data._id}/vet_plan`,
				newData
			);

			handleClose();
			reload(() => []);
			reloadActivities(() => []);

			setTimeout(() => {
				toast.success(res.data, {});
			}, 200);
		} catch (error) {
			let message = error.response
				? error.response.data.message
				: error.message;
			// console.log(error);
			// console.log(message);

			setLoading(false);

			toast.error(message, {});
		}
	};

	useEffect(() => {
		const modal = document.querySelector(".modalView");
		if (modal) {
			open ? modal.showModal() : modal.close();
		}
	}, [open]);

	return (
		<>
			<button className="btn vet__add" onClick={handleOpen}>
				Add
			</button>

			{open && (
				<dialog className="modalView">
					<div className="vettingCardAddModal">
						<header>
							<span>
								Plan - {data?.planNumber?.fullValue || data?.uniqueId}
							</span>
							<div className="modalViewCloseButton" onClick={handleClose}>
								<CloseRounded className="closeButton" />
							</div>
						</header>

						<form action="" onSubmit={handleSubmit}>
							<div className="applicationItemsWrapper">
								<div className="applicationTitle">
									<h3>Add {type} Comment </h3>
								</div>
								{isCleared && (
									<div className="errorProhibited">
										<ErrorRounded className="errorProhibitedIcon" />{" "}
										<p>
											Adding comment after it is cleared is prohibited. Make
											sure you have the appropriate permission to perform this
											task!
										</p>
									</div>
								)}

								<div className="minuteItems">
									<div className="minuteItem">
										<label htmlFor="minuteStatus">Status:</label>
										<select name="minuteStatus" id="minuteStatus" required>
											<option value="">...</option>

											{VETTING_STATUS_LIST.map((e) => {
												return <option value={e}>{e}</option>;
											})}
										</select>
									</div>

									<div className="minuteItem">
										<label htmlFor="minuteText">Comment:</label>
										{/* <textarea
										required
										name="minuteText"
										id="minuteText"
										cols="30"
										rows="8"></textarea> */}
										<TextEditor value={contentValue} ref={editorRef1} />
									</div>
								</div>
							</div>
							<footer>
								<button type="submit" className="primary" disabled={loading}>
									{loading ? (
										<CircularProgress
											thickness={5}
											size={20}
											sx={{ color: "white" }}
										/>
									) : (
										"Save"
									)}
								</button>
							</footer>
						</form>
					</div>
				</dialog>
			)}
		</>
	);
}
export default VettingCardAddModal;
