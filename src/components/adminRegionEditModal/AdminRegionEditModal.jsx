import "./adminRegionEditModal.css";
import {
	AddPhotoAlternateRounded,
	FileUploadRounded,
	Image,
	UploadFileRounded,
} from "@mui/icons-material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CloseRounded, EditRounded } from "@mui/icons-material";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { getThemeColor } from "../../utilities/themeColor";
import { useNavigate } from "react-router-dom";
import ToggleSwitch from "../toggleSwitch/ToggleSwitch";

export default function AdminRegionEditModal({ ...props }) {
	const [open, setOpen] = useState(false);
	const [isActive, setIsActive] = useState(true);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);

	const [name, setName] = useState(undefined);
	const [code, setCode] = useState(undefined);
	const [zones, setZones] = useState([]);

	const [removeItemButton, setRemoveItemButton] = useState(null);

	const theme = getThemeColor();

	const handleOpen = () => {
		setOpen(true);

		if (props.modalType === "edit") {
			setData(props.data);
			setName(props.data.name);
			setCode(props.data.code);
			setZones(props.data.zones);
			setIsActive(props.data.isActive);
		}
	};
	const handleClose = () => {
		setLoading(false)
		setOpen(false)
		setName(undefined)
		setCode(undefined)
		setZones([])
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

	const handleSubmitNew = async () => {
		setLoading(true);
		let newData = {};
		newData.isActive = isActive;
		code && (newData.code = code);
		name && (newData.name = name);
		zones && (newData.zones = zones.filter((str) => str !== ""));

		try {
			let host = import.meta.env.VITE_SERVER;
			let res = await axios.post(`${host}/admin/region`, newData);

			handleClose()

			props.setReload(() => []);

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
			setLoading(false);

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
	const handleSubmitEdit = async () => {
		setLoading(true);
		let newData = {};
		newData.isActive = isActive;
		code && (newData.code = code);
		name && (newData.name = name);
		zones && (newData.zones = zones.filter((str) => str !== ""));

		try {
			let host = import.meta.env.VITE_SERVER;
			let res = await axios.put(`${host}/admin/region/${data._id}`, newData);

			setLoading(false);
			setOpen(false);
			props.setReload(() => []);

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
			setLoading(false);

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

	return (
		<>
			<button className={props.buttonClass} onClick={handleOpen}>
				{props.buttonIcon}
				{props.buttonName}
			</button>

			{open && (
				<dialog className="modalView adminStaffEditModal adminRegionEditModal ">
					<div>
						<header>
							<span>
								{props.modalType === "add"
									? "Create New Region"
									: props.modalType === "edit"
									? "Edit Region Info"
									: ""}
							</span>

							<div className="modalViewCloseButton" onClick={handleClose}>
								<CloseRounded className="closeButton" />
							</div>
						</header>

						<div className="inputStaffHeader">
							<div className="inputStaffHeaderLeft">
								<div>
									<span>Active Status:</span>
								</div>
							</div>
							<div className="inputStaffHeaderRight">
								<div>
									<ToggleSwitch
										toggled={isActive}
										label={"isActive"}
										onClick={setIsActive}
									/>
								</div>
							</div>
						</div>

						<div className="applicationForm">
							<div className="applicationInputWrapper">
								<div className="applicationItemsWrapper">
									<div className="applicationTitle">
										<h3>Region Information</h3>
									</div>
									<div className="applicationItems">
										<div className="applicationItem">
											<label htmlFor={"staffAddress"}>Code:</label>
											<input
												type="text"
												name={"staffAddress"}
												id={"staffAddress"}
												// ref={code}
												value={code}
												onChange={(e) => setCode(e.target.value)}
											/>
										</div>
										<div className="applicationItem">
											<label htmlFor={"staffAddress"}>Name:</label>
											<input
												type="text"
												name={"staffAddress"}
												id={"staffAddress"}
												// ref={name}
												onChange={(e) => setName(e.target.value)}
												value={name}
											/>
										</div>
										<br />
										<div className="applicationTitle">
											<h3>Zones</h3>
										</div>

										{zones.map((d, i) => {
											return (
												<div
													key={i}
													className="applicationItem zones"
													onMouseEnter={() => setRemoveItemButton(i)}
													onMouseLeave={() => setRemoveItemButton(false)}>
													{removeItemButton === i && (
														<div className="removeItemButton">
															<CloseRounded
																className="clearPhotoIcon"
																onClick={() => {
																	let newArr = [...zones];
																	newArr.splice(i, 1);
																	setZones(newArr);
																}}
															/>
														</div>
													)}
													<label htmlFor={"staffAddress"}>{i + 1} :</label>
													<input
														type="text"
														name={"staffAddress"}
														id={"staffAddress"}
														value={zones[i]}
														// onChange={(e)=>setZones(zones[i] = e.target.value)}
														onChange={(e) => {
															let newArr = [...zones];
															newArr[i] = e.target.value;
															setZones(newArr);
														}}
													/>
												</div>
											);
										})}

										<button
											onClick={() => {
												let newArr = [...zones];
												newArr.push("");
												setZones(newArr);
											}}>
											Add
										</button>
									</div>
								</div>
							</div>
						</div>
						<footer>
							<button
								disabled = {loading}
								onClick={
									props.modalType === "edit"
										? handleSubmitEdit
										: handleSubmitNew
								}
								className="primary">
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
					</div>
					<ToastContainer />
				</dialog>
			)}
		</>
	);
}
