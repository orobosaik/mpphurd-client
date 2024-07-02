import "./staffOfficePermissionModal.css";
import {
	AddPhotoAlternateRounded,
	FileUploadRounded,
	Image,
	UploadFileRounded,
} from "@mui/icons-material";
import ToggleSwitch from "../toggleSwitch/ToggleSwitch";
import React, { useCallback, useEffect, useState } from "react";
import { CloseRounded, EditRounded } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import { getThemeColor } from "../../utilities/themeColor";
import { CircularProgress } from "@mui/material";
import { JOB_TITLE_LIST, POSITION_LIST } from "../../utilities/appData";
import uuid from "react-uuid";
import { fetchInstance } from "../../utilities/fetcher";

export default function StaffOfficePermissionModal({ ...props }) {
	const [open, setOpen] = useState(false);

	const [loading, setLoading] = useState(false);
	const [initLoading, setInitLoading] = useState(false);

	const [data, setData] = useState(null);

	const [tasks, setTasks] = useState([]);
	const [list, setList] = useState([]);

	const theme = getThemeColor();

	const handleOpen = async () => {
		setOpen(true);
		// setInitLoading(true);

		const loadOffices = async () => {
			try {
				let host = import.meta.env.VITE_SERVER;
				let res = await axios.get(`${host}/admin/office`);

				const offices = await res.data;

				const activeOffices = offices.filter((o) => o.isActive === true);

				setOffices(
					activeOffices.sort((a, b) => {
						const nameA = a.name.toUpperCase(); // ignore upper and lowercase
						const nameB = b.name.toUpperCase(); // ignore upper and lowercase
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

				const filteredRegions = await res.data
					.filter((value, index, self) => {
						return (
							self.findIndex((v) => v.region._id === value.region._id) === index
						);
					})
					?.map((item) => item.region);

				setRegion(filteredRegions[0]);
				setRegions(filteredRegions);

				// console.log(offices, filteredRegions, filteredRegions[0]);
			} catch (error) {
				let message = error.response
					? error.response.data.message
					: error.message;

				toast.error(message, {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: theme,
				});
			}
		};
		// await loadOffices();
	};

	const handleClose = () => {
		setTasks([]);

		setLoading(false);
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
		const modal = document.querySelector(".adminStaffEditModal");
		if (modal) {
			open ? modal.showModal() : modal.close();
		}
		return () => {};
	}, [open]);

	const handleSubmit = async (data) => {
		setLoading(true);
		try {
			let res = await fetchInstance.post(`/staffs/staff/update_permission`, data);

			props.setReload(() => []);
			setOpen(false);
			setTimeout(() => {
				toast.success(res.data, {
					position: "top-right",
					autoClose: 1000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: theme,
				});
			}, 0);
		} catch (error) {
			let message = error.response
				? error.response.data.message
				: error.message;
			toast.error(message, {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: theme,
			});
		} finally {
			setLoading(false)
		}
	};

	return (
		<>
			<button className={props.buttonClass} onClick={handleOpen}>
				{props.buttonIcon}
				{props.buttonName}
			</button>

			{open && (
				<dialog className="modalView adminStaffEditModal ">
					{initLoading ? (
						<div className="loading-container">
							<CircularProgress
								thickness={3}
								size={55}
								className="loading-icon"
							/>
						</div>
					) : (
						<>
							<header>
								<span>{props.officeData.id.name}</span>
								<div className="modalViewCloseButton" onClick={handleClose}>
									<CloseRounded className="closeButton" />
								</div>
							</header>

							<form
								action=""
								onSubmit={(e) => {
									e.preventDefault();
									let data = [];
									Array.from(e.target).forEach((e, i) => {
										if (e.checked) {
											data.push(e.value);
										}
									});
									const newData = {
										tasks: data,
										staffId: props.staffData._id,
										officeId: props.officeData.id._id
									}
									handleSubmit(newData);
								}}>
								<div className="permissions">
									<p className="title">
										{props.staffData.firstName +
											" " +
											props.staffData.lastName +
											" Permissions"}
									</p>

									<div className="wrapper">
										{props.officeData.id.tasks.map((e, i) => {
											return (
												<div className="item">
													<span>{e}</span>
													<input
														type="checkbox"
														value={e}
														name="tasks"
														defaultChecked={props.officeData.tasks.includes(e)}
													/>
												</div>
											);
										})}
									</div>
								</div>
								<footer>
									<button disabled={loading} type="submit" className="primary">
										{loading ? (
											<CircularProgress
												thickness={5}
												size={20}
												sx={{ color: "white" }}
											/>
										) : props.modalType === "edit" ? (
											"Update"
										) : (
											"Save"
										)}
									</button>
								</footer>
							</form>
						</>
					)}
				</dialog>
			)}
		</>
	);
}
