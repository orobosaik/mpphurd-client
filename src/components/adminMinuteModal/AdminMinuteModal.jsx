import React, { useCallback, useEffect, useState } from "react";
import "./adminMinuteModal.css";
import {
	CloseRounded,
	EditRounded,
	FileUploadRounded,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";
import { getThemeColor } from "../../utilities/themeColor";
import { CircularProgress } from "@mui/material";

export default function AdminMinuteModal({
	buttonIcon,
	buttonText,
	children,
	data,
	reload,
}) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [planData, setPlanData] = useState(data);

	const [officeList, setOfficeList] = useState([]);
	const [staffList, setStaffList] = useState([]);

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const form = new FormData(e.target);
		console.log(form);

		const newData = {
			newOfficeId: form.get("minuteToOfficer"),
			fromOfficerId: form.get("minuteFromOfficer"),
			status: form.get("minuteStatus"),
			text: form.get("minuteText"),
			date: form.get("minuteItemData"),
		};
		console.log(newData);

		axios.defaults.withCredentials = true;

		try {
			let host = import.meta.env.VITE_SERVER;
			const res = await axios.post(
				`${host}/admin/plan/${data._id}/minute`,
				newData,
				{
					withCredentials: true,
				}
			);
			console.log(res.data);

			// dispatch(resetOfficeData());
			// navigate(-2);
			reload(() => []);
			handleClose();

			setTimeout(() => {
				toast.success(res.data, {
					position: "top-right",
					autoClose: 1000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: themeColor,
				});
			}, 200);
		} catch (error) {
			let message = error.response
				? error.response.data.message
				: error.message;
			console.log(error);
			console.log(message);

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
		}
		setLoading(false);
	};

	useEffect(() => {
		const modal = document.querySelector(".modalView");
		if (modal) {
			open ? modal.showModal() : modal.close();
		}
	}, [open]);

	// Fetch Data on Load
	useEffect(() => {
		const getData = async () => {
			axios.defaults.withCredentials = true;
			try {
				let host = import.meta.env.VITE_SERVER;

				const res = await Promise.all([
					axios.get(`${host}/admin/office`, {
						withCredentials: true,
					}),
					axios.get(`${host}/admin/staff`, {
						withCredentials: true,
					}),
				]);

				const office = res[0].data;
				const staff = res[1].data;

				let currentStaffList = staff.filter((s) =>
					s.office.some((so) => so?.id?._id === data.currentOffice.id._id)
				);

				setStaffList(currentStaffList);

				let presentOfficeList = office.map((o) => {
					// Prevent showing current plan office
					if (o._id === data.currentOffice.id._id) return;

					let officeStaff = staff.filter((s) =>
						s.office.some((so) => so?.id?._id === o._id)
					);
					let text;
					if (officeStaff.length === 0) {
						text = `${o.region.code.toUpperCase()} - ${o.name} (Unavailable)`;
					} else if (officeStaff.length > 1) {
						text = `${o.region.code.toUpperCase()} - ${o.name} (Multiple)`;
					} else {
						text = `${o.region.code.toUpperCase()} - ${o.name} (${
							officeStaff[0].fullName
						})`;
					}
					return {
						office: o,
						officeId: o._id,
						text,
					};
				});

				// Sort list and set as office list
				setOfficeList(
					presentOfficeList.sort((a, b) => {
						const nameA = a.text.toUpperCase(); // ignore upper and lowercase
						const nameB = b.text.toUpperCase(); // ignore upper and lowercase
						if (nameA < nameB) {
							return -1;
						}
						if (nameA > nameB) {
							return 1;
						}
						// names must be equal
						return 0;
					})
				);
				console.log("Office List:", officeList);
				console.log("Staff List:", staffList);
			} catch (error) {
				let message = error.response
					? error.response.data.message
					: error.message;
				console.log(error);
				console.log(message);
			}
		};
		getData();
	}, []);

	return (
		<div>
			<div>
				<button className="modalTrigger primary" onClick={handleOpen}>
					Minute
				</button>
			</div>

			{open && (
				<dialog className="modalView">
					<header>
						<span>{data?.planNumber?.fullValue || data?.uniqueId}</span>
						<div className="modalViewCloseButton" onClick={handleClose}>
							<CloseRounded className="closeButton" />
						</div>
					</header>

					<form action="" onSubmit={handleSubmit}>
						<div className="applicationItemsWrapper">
							<div className="applicationTitle">
								<h3>Minute Plan</h3>
							</div>

							<div>
								<div className="minuteItems">
									<div className="minuteItem">
										<label htmlFor="minuteItemData">
											Date:{" "}
											<span className="optionIssueTag">
												Do not select a date except for backlog
											</span>
										</label>
										<input
											type="date"
											name="minuteItemData"
											id="minuteItemData"
										/>
									</div>

									<div className="minuteItem">
										<label htmlFor="minuteFromOfficer">From Officer:</label>
										<select name="minuteFromOfficer" id="minuteFromOfficer">
											{staffList.map((o) => {
												console.log(o);
												if (o?._id) {
													return (
														<option key={o._id} value={o._id}>
															{o?.region?.code.toUpperCase()} -{" "}
															{data.currentOffice.id.name} ({o?.fullName})
														</option>
													);
												}
											})}
										</select>
									</div>

									<div className="minuteItem">
										<label htmlFor="minuteToOfficer">To Office:</label>

										<select name="minuteToOfficer" id="minuteToOfficer">
											{officeList.map((o) => {
												if (o?.officeId) {
													return (
														<option key={o.officeId} value={o.officeId}>
															{o.text}
														</option>
													);
												}
											})}
										</select>
									</div>

									<div className="minuteItem">
										<label htmlFor="minuteStatus">Status:</label>
										<select name="minuteStatus" id="minuteStatus">
											<option value="">...</option>
											<option value="Action Taken">Action Taken</option>
											<option value="Issue Raised">Issue Raised</option>
											<option value="Observation">Observation</option>
											<option value="Pending Action">Pending Action</option>
										</select>
									</div>

									<div className="minuteItem">
										<label htmlFor="minuteText">Comment:</label>
										<textarea
											name="minuteText"
											id="minuteText"
											cols="30"
											rows="7"></textarea>
									</div>
								</div>
							</div>
						</div>
						<footer>
							<button type="submit" className="primary">
								{loading ? (
									<CircularProgress
										thickness={5}
										size={20}
										sx={{ color: "white" }}
									/>
								) : (
									"Minute"
								)}
							</button>
						</footer>
					</form>
				</dialog>
			)}
		</div>
	);
}
