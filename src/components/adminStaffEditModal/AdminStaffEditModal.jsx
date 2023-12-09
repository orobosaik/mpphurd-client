import "./adminStaffEditModal.css";
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

export default function AdminStaffEditModal({ ...props }) {
	const [open, setOpen] = useState(false);

	const [isActive, setIsActive] = useState(true);
	const [isManagement, setIsManagement] = useState(false);

	const [loading, setLoading] = useState(false);
	const [initLoading, setInitLoading] = useState(true);

	const [data, setData] = useState(null);
	const [name, setName] = useState(undefined);
	const [phones, setPhones] = useState(undefined);
	const [gender, setGender] = useState(undefined);
	const [address, setAddress] = useState(undefined);
	const [emails, setEmails] = useState(undefined);
	const [position, setPosition] = useState(undefined);
	const [designation, setDesignation] = useState(undefined);

	const [tasks, setTasks] = useState([]);
	const [zone, setZone] = useState(undefined);
	const [office, setOffice] = useState({});
	const [region, setRegion] = useState(undefined);

	const [offices, setOffices] = useState();
	const [regions, setRegions] = useState([]);
	const [list, setList] = useState([]);

	const theme = getThemeColor();

	const [removeListButton, setRemoveListButton] = useState(null);

	const handleOpen = async () => {
		const loadOffices = async () => {
			try {
				let host = import.meta.env.VITE_SERVER;
				let res = await axios.get(`${host}/admin/office`);

				setInitLoading(false);

				const offices = await res.data;
				setOffices(offices);
				setOffice(offices[0]);

				const filteredRegions = await res.data
					.filter((value, index, self) => {
						return (
							self.findIndex((v) => v.region._id === value.region._id) === index
						);
					})
					.map((item) => item.region);

				setRegion(filteredRegions[0]);
				setRegions(filteredRegions);

				console.log(offices, filteredRegions, filteredRegions[0]);
			} catch (error) {
				setInitLoading(false);

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
		loadOffices();

		console.log(offices);

		if (props.modalType === "edit") {
			setData(props.data);
			setIsActive(props.data.isActive);
			setName(props.data.name);
			setRegion(props.data.region);
			setZone(props.data.zone);
			setTasks(props.data.tasks);
			setIsActive(props.data.isActive);
		} else {
			setRegion(regions[0]);
		}
		setOpen(true);
	};
	const handleClose = () => {
		setLoading(false);
		setList([]);
		setOpen(false);
		setPhoto(null);
		setName(undefined);
		setRegion(undefined);
		setZone(undefined);
		setTasks([]);
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

	const [photo, setPhoto] = useState(null);
	const [clearPhotoButton, setClearPhotoButton] = useState(true);

	const onPhotoChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			setPhoto(URL.createObjectURL(event.target.files[0]));
			console.log(URL.createObjectURL(event.target.files[0]));
		}
	};

	const handleSubmitNew = async () => {
		setLoading(true);
		let newData = {};
		newData.isActive = isActive;
		name && (newData.name = name);
		region && (newData.region = region._id);
		zone && (newData.zone = zone);
		tasks && (newData.tasks = tasks.filter((str) => str !== ""));

		try {
			let host = import.meta.env.VITE_SERVER;
			let res = await axios.post(`${host}/admin/office`, newData);

			handleClose();

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
		name && (newData.name = name);
		region && (newData.region = region._id);
		zone && (newData.zone = zone);
		tasks && (newData.tasks = tasks.filter((str) => str !== ""));

		try {
			let host = import.meta.env.VITE_SERVER;
			let res = await axios.put(`${host}/admin/office/${data._id}`, newData);

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
				<dialog className="modalView adminStaffEditModal ">
					<header>
						<span>Staff Info</span>
						{
							// offices.filter((v, i, self)=> i == self.indexOf(v))
						}

						<div className="modalViewCloseButton" onClick={handleClose}>
							<CloseRounded className="closeButton" />
						</div>
					</header>

					<div className="inputStaffHeader">
						<div
							className="staffImage"
							onMouseEnter={() => setClearPhotoButton(true)}
							onMouseLeave={() => setClearPhotoButton(false)}>
							{clearPhotoButton && photo && (
								<div className="clearPhotoButton">
									<CloseRounded
										className="clearPhotoIcon"
										onClick={() => setPhoto(null)}
									/>
								</div>
							)}
							<label
								htmlFor={"staffMeansOfIdentification"}
								className="uploadImageWrapper">
								{photo ? (
									<img src={photo} alt="" />
								) : (
									<div>
										<span>
											<AddPhotoAlternateRounded fontSize="large" />
										</span>
										<span>Select Image</span>
									</div>
								)}
								<input
									type="file"
									name={"staffMeansOfIdentification"}
									id={"staffMeansOfIdentification"}
									accept="image/png, image/jpeg, image/jpg"
									onChange={onPhotoChange}
								/>
							</label>
						</div>
						<div className="inputStaffHeaderRight">
							<div>
								<span>Active Status:</span>

								<ToggleSwitch
									toggled={isActive}
									label={"isActive"}
									onClick={setIsActive}
								/>
							</div>
							<div>
								<span>Management Staff:</span>
								<ToggleSwitch
									toggled={isManagement}
									label={"isManagement"}
									onClick={setIsManagement}
								/>
							</div>
						</div>
					</div>
					<div className="applicationForm">
						<div className="applicationInputWrapper">
							<div className="applicationItemsWrapper">
								<div className="applicationTitle">
									<h3>Staff Personal Information</h3>
								</div>
								<div className="applicationItems">
									<div className="applicationItem">
										<div className="applicationItemName">
											<div>
												<label htmlFor={"staffTitle"}>Title:</label>
												<input
													type="text"
													name={"staffTitle"}
													id={"staffTitle"}
												/>
											</div>
											<div>
												<label htmlFor={"staffFirstName"}>First name:</label>
												<input
													type="text"
													name={"staffFirstName"}
													id={"staffFirstName"}
													required
													min={2}
												/>
											</div>
											<div>
												<label htmlFor={"staffSurname"}>Surname:</label>
												<input
													type="text"
													name={"staffSurname"}
													id={"staffSurname"}
													required
													min={2}
												/>
											</div>
											<div>
												<label htmlFor={"staffOtherName"}>Other name:</label>
												<input
													type="text"
													name={"staffOtherName"}
													id={"staffOtherName"}
													min={2}
												/>
											</div>
											<div>
												<label htmlFor={"staffSuffix"}>Suffix:</label>
												<input
													type="text"
													name={"staffSuffix"}
													id={"staffSuffix"}
												/>
											</div>
										</div>
									</div>

									<div className="applicationItem">
										<label htmlFor={"staffGender"}>Gender:</label>
										<div className="radioBoxWrapper">
											<label htmlFor={"staffGender1"}>
												<span>Female</span>
												<input
													type="radio"
													name="gender"
													value="female"
													id={"staffGender1"}
												/>
											</label>

											<label htmlFor={"staffGender2"}>
												<span>Male</span>
												<input
													type="radio"
													name="gender"
													value="male"
													id={"staffGender2"}
												/>
											</label>
										</div>
									</div>
									<div className="applicationItem">
										<label htmlFor={"staffAddress"}>Address:</label>
										<input
											type="text"
											name={"staffAddress"}
											id={"staffAddress"}
										/>
									</div>
									<div className="applicationItem">
										<div className="applicationItemPhone">
											<div>
												<label htmlFor={"staffPhone1"}>Phone 1:</label>
												<input
													type="tel"
													name={"staffPhone1"}
													id={"staffPhone1"}
												/>
											</div>
											<div>
												<label htmlFor={"staffPhone2"}>Phone 2:</label>
												<input
													type="tel"
													name={"staffPhone1"}
													id={"staffPhone2"}
												/>
											</div>
										</div>
									</div>

									<div className="applicationItem">
										<div className="applicationItemEmail">
											<div>
												<label htmlFor={"staffOfficialEmail"}>
													Official Email:
												</label>
												<input
													type="email"
													id={"staffOfficialEmail"}
													required
													min={10}
													max={50}
												/>
											</div>
											<div>
												<label htmlFor={"staffAlternativeEmail"}>
													Alternative Email:
												</label>
												<input
													type="email"
													id={"staffAlternativeEmail"}
													required
													min={10}
													max={50}
												/>
											</div>
										</div>
									</div>

									<div className="applicationItem">
										<div className="applicationItemLocation">
											<div>
												<label htmlFor="staffDesignation">Designation:</label>
												<input
													type="text"
													name="staffDesignation"
													id="staffDesignation"
												/>
											</div>
											<div>
												<label htmlFor="staffOffice">Position:</label>
												<select name="staffOffice" id="staffOffice">
													<option value="proposed">Proposed</option>
													<option value="underConstruction">
														Under Construction
													</option>
													<option value="built">Built</option>
												</select>
											</div>

											<div>
												<label htmlFor="staffEditRegion">Region:</label>
												<select
													name="staffEditRegion"
													id="staffEditRegion"
													defaultValue={region?._id}
													onChange={(e) => {
														const reg = regions.find(
															(option) => option._id === e.target.value
														);
														const off = offices.find(
															(option) => option.region._id === e.target.value
														);
														setOffice(off);
														setRegion(reg);
													}}>
													{regions?.map((r, i) => {
														return (
															<option key={i} data={i} value={r._id}>
																{r.name}
															</option>
														);
													})}
												</select>
											</div>
										</div>
									</div>

									<div className="applicationItem">
										<label htmlFor="">Office and Tasks</label>

										<div className="inputStaffOfficeWrapper">
											<div className="inputStaffOfficeList">
												{list.map((li, index) => {
													return (
														<div key={li.office._id} className="inputStaffOffice">
															<button
																onMouseEnter={() => {
																	setRemoveListButton(() => false);
																	// console.log(removeListButton);
																	// console.log(list)
																}}
																onMouseLeave={() => {
																	setRemoveListButton(() => index);
																	// console.log(removeListButton);
																}}
																onClick={() => {
																	let newArr = [...list];

																	console.log(index);
																	console.log(newArr[index].office);

																	const arrayEd = [];

																	setList((list) =>
																		list.filter((el, i) => i !== index)
																	);

																	// newArr.splice(index + 1, 1);

																	// setList(() => arrayEd);
																	console.log(list);
																}}>
																Del
															</button>

															<div>
																<label>Office</label>
																<select
																	name="staffEditOffice"
																	id="staffEditOffice"
																	onChange={(e) => {
																		// const office = offices.find(
																		// 	(option) => option._id === e.target.value
																		// );
																		// setOffice(office);

																		let newArr = [...list];
																		newArr[index].office = offices.find(
																			(option) => option._id === e.target.value
																		);
																		setList(newArr);
																	}}>
																	{offices?.map((o, i) => {
																		if (o?.region?._id === region?._id) {
																			return (
																				<option key={i} data={i} value={o._id}>
																					{o.name}
																				</option>
																			);
																		}
																	})}
																</select>
															</div>

															<div>
																<label>Tasks</label>
																<div className="taskList">
																	{list[index].office?.tasks?.map((task, i) => {
																		return (
																			<span key={i}>
																				<input
																					type="checkbox"
																					name={`staffEditTasks${i}`}
																					id={`staffEditTasks${i}`}
																				/>
																				<label htmlFor={`staffEditTasks${i}`}>
																					{task}
																				</label>
																			</span>
																		);
																	})}
																</div>
															</div>
														</div>
													);
												})}
											</div>
											<button
												onClick={() => {
													let newArr = [...list];
													newArr.push([]);
													newArr[list.length].office = offices[0];
													console.log(newArr);
													setList(newArr);
												}}>
												Add
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<footer>
						<button
							disabled={loading}
							onClick={
								props.modalType === "edit" ? handleSubmitEdit : handleSubmitNew
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
				</dialog>
			)}
		</>
	);
}
