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
import { JOB_TITLE_LIST, POSITION_LIST } from "../../utilities/appData";
import uuid from "react-uuid";

export default function AdminStaffEditModal({ ...props }) {
	const [open, setOpen] = useState(false);

	const [isActive, setIsActive] = useState(false);
	const [isManagement, setIsManagement] = useState(false);

	const [loading, setLoading] = useState(false);
	const [initLoading, setInitLoading] = useState(false);

	const [photo, setPhoto] = useState("");
	const [photoUrl, setPhotoUrl] = useState("");
	const [clearPhotoButton, setClearPhotoButton] = useState(true);

	const [data, setData] = useState(null);

	const [name, setName] = useState({
		firstName: "",
		title: "",
		middleName: "",
		lastName: "",
		suffix: "",
	});
	const [phones, setPhones] = useState({});
	const [gender, setGender] = useState("");
	const [address, setAddress] = useState(undefined);
	const [emails, setEmails] = useState({});
	const [position, setPosition] = useState(undefined);
	const [designation, setDesignation] = useState(undefined);

	const [tasks, setTasks] = useState([]);
	const [region, setRegion] = useState(undefined);

	const [offices, setOffices] = useState([]);
	const [regions, setRegions] = useState([]);
	const [list, setList] = useState([]);

	const theme = getThemeColor();

	const handleOpen = async () => {
		setOpen(true);
		setInitLoading(true);
		setPhotoUrl(props?.data?.profilePicture || "/assets/persons/no_avatar.png");

		const loadOffices = async () => {
			try {
				let host = import.meta.env.VITE_SERVER;
				let res = await axios.get(`${host}/admin/office`);

				const offices = await res.data;
				setOffices(offices.filter((o) => o.isActive === true));

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
		await loadOffices();

		if (props.modalType === "edit") {
			const data = { ...props.data };
			setData(data);

			setIsActive(data.isActive);
			setIsManagement(data.isManagement);

			setPhoto(data.profilePicture);
			setName({
				title: data.title,
				firstName: data.firstName,
				middleName: data.middleName,
				lastName: data.lastName,
				suffix: data.suffix,
			});

			setGender(data.gender);
			setAddress(data.address);

			setPhones({
				phone: data.phone,
				phone1: data.phone1,
			});
			setEmails({
				email: data.email,
				email1: data.email1,
			});

			setDesignation(data.jobTitle);
			setPosition(data.position);

			setRegion(data.region);
			setList(data.office);
		}
		setInitLoading(false);
	};

	const handleClose = () => {
		setIsActive(null);
		setIsManagement(null);

		setPhoto(null);
		setName({});
		setPhones({});
		setGender("");
		setAddress("");
		setEmails({});
		setPosition(undefined);
		setDesignation("");

		setTasks([]);
		setRegion(undefined);

		setOffices([]);
		setRegions([]);
		setList([]);
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

	const onPhotoChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			setPhoto(event.target.files[0]);
			setPhotoUrl(URL.createObjectURL(event.target.files[0]));

			const formData = new FormData();
			//FILE INFO NAME WILL BE "my-image-file"
			formData.append(
				"my-image-file",
				event.target.files[0],
				event.target.files[0].name
			);
			// setPhoto(formData);
			console.log(photo);
			console.log(formData);
		}
	};

	const handleSubmitNew = async () => {
		setLoading(true);
		let newData = {};
		newData.password = uuid();
		newData.isActive = isActive;
		newData.isManagement = isManagement;
		// newData.profilePicture = photo;
		newData.title = name.title;
		newData.firstName = name.firstName;
		newData.middleName = name.middleName;
		newData.lastName = name.lastName;
		newData.suffix = name.suffix;
		newData.gender = gender;
		newData.address = address;
		newData.phone = phones.phone;
		newData.phone1 = phones.phone1;
		newData.email = emails.email;
		newData.email1 = emails.email1;
		newData.jobTitle = designation;
		newData.position = position;
		newData.region = region;
		newData.office = list;
		console.log(newData);

		try {
			let host = import.meta.env.VITE_SERVER;
			let res = await axios.post(`${host}/admin/staff`, newData);

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
	const handleSubmitEdit = async (e, data) => {
		setLoading(true);
		let newData = {};
		newData.isActive = isActive;
		newData.isManagement = isManagement;
		// newData.profilePicture = photo;
		newData.title = name.title;
		newData.firstName = name.firstName;
		newData.middleName = name.middleName;
		newData.lastName = name.lastName;
		newData.suffix = name.suffix;
		newData.gender = gender;
		newData.address = address;
		newData.phone = phones.phone;
		newData.phone1 = phones.phone1;
		newData.email = emails.email;
		newData.email1 = emails.email1;
		newData.jobTitle = designation;
		newData.position = position;
		newData.region = region;
		newData.office = list;

		try {
			let host = import.meta.env.VITE_SERVER;
			let res = await axios.put(`${host}/admin/staff/${data._id}`, newData);

			props.setReload(() => []);
			setLoading(false);
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
	const handleSubmit = () => {
		props.modalType === "edit"
			? (e) => handleSubmitEdit(e, data)
			: handleSubmitNew;
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
								<span>Staff Info</span>
								<div className="modalViewCloseButton" onClick={handleClose}>
									<CloseRounded className="closeButton" />
								</div>
							</header>

							<form action="" onSubmit={handleSubmit}>
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
												<img src={photoUrl} alt="" />
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
																value={name.title}
																onChange={(e) => {
																	let val = e.target.value;
																	let newWord = { ...name };
																	newWord.title = val;
																	setName(newWord);
																}}
															/>
														</div>
														<div>
															<label htmlFor={"staffFirstName"}>
																First name:
															</label>
															<input
																type="text"
																name={"staffFirstName"}
																id={"staffFirstName"}
																required
																min={2}
																value={name?.firstName}
																onChange={(e) => {
																	let val = e.target.value;
																	let newWord = { ...name };
																	newWord.firstName = val;
																	setName(newWord);
																}}
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
																value={name?.lastName}
																onChange={(e) => {
																	let val = e.target.value;
																	let newWord = { ...name };
																	newWord.lastName = val;
																	setName(newWord);
																}}
															/>
														</div>
														<div>
															<label htmlFor={"staffOtherName"}>
																Other name:
															</label>
															<input
																type="text"
																name={"staffOtherName"}
																id={"staffOtherName"}
																min={2}
																value={name?.middleName}
																onChange={(e) => {
																	let val = e.target.value;
																	let newWord = { ...name };
																	newWord.middleName = val;
																	setName(newWord);
																}}
															/>
														</div>
														<div>
															<label htmlFor={"staffSuffix"}>Suffix:</label>
															<input
																type="text"
																name={"staffSuffix"}
																id={"staffSuffix"}
																value={name?.suffix}
																onChange={(e) => {
																	let val = e.target.value;
																	let newWord = { ...name };
																	newWord.suffix = val;
																	setName(newWord);
																}}
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
																defaultChecked={gender === "female"}
																onChange={(e) => setGender(e.target.value)}
															/>
														</label>

														<label htmlFor={"staffGender2"}>
															<span>Male</span>
															<input
																type="radio"
																name="gender"
																value="male"
																id={"staffGender2"}
																defaultChecked={gender === "male"}
																onChange={(e) => setGender(e.target.value)}
															/>
														</label>
													</div>
												</div>
												{/* <div className="applicationItem">
												<label htmlFor={"staffAddress"}>Address:</label>
												<input
													type="text"
													name={"staffAddress"}
													id={"staffAddress"}
													value={address}
													onChange={(e) => setAddress(e.target.value)}
												/>
											</div> */}
												<div className="applicationItem">
													<div className="applicationItemPhone">
														<div>
															<label htmlFor={"staffPhone1"}>Phone 1:</label>
															<input
																type="tel"
																name={"staffPhone1"}
																id={"staffPhone1"}
																value={phones?.phone}
																onChange={(e) => {
																	let val = e.target.value;
																	let newPhone = { ...phones };
																	newPhone.phone = val;
																	setPhones(newPhone);
																}}
															/>
														</div>
														<div>
															<label htmlFor={"staffPhone2"}>Phone 2:</label>
															<input
																type="tel"
																name={"staffPhone1"}
																id={"staffPhone2"}
																value={phones?.phone1}
																onChange={(e) => {
																	let val = e.target.value;
																	let newPhone = { ...phones };
																	newPhone.phone1 = val;
																	setPhones(newPhone);
																}}
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
																value={emails.email}
																onChange={(e) => {
																	let val = e.target.value;
																	let newMail = { ...emails };
																	newMail.email = val;
																	setEmails(newMail);
																}}
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
																value={emails.email1}
																onChange={(e) => {
																	let val = e.target.value;
																	let newMail = { ...emails };
																	newMail.email1 = val;
																	setEmails(newMail);
																}}
															/>
														</div>
													</div>
												</div>

												<div className="applicationItem">
													<div className="applicationItemLocation">
														<div>
															<label htmlFor="staffDesignation">
																Designation:
															</label>
															<select
																defaultValue={designation}
																onChange={(e) => setDesignation(e.target.value)}
																name="staffDesignation"
																id="staffDesignation">
																<option value="">----</option>
																{JOB_TITLE_LIST.map((e) => {
																	return <option value={e}>{e}</option>;
																})}
															</select>
														</div>
														<div>
															<label htmlFor="staffPosition">Position:</label>
															<select
																defaultValue={position}
																onChange={(e) => setPosition(e.target.value)}
																name="staffPosition"
																id="staffPosition">
																<option value="">----</option>
																{POSITION_LIST.map((e) => {
																	return <option value={e}>{e}</option>;
																})}
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
																		(option) =>
																			option.region._id === e.target.value
																	);
																	setRegion(reg);
																	setList([]);
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
																	<div
																		key={`${li?.id?._id}${index}`}
																		className="inputStaffOffice">
																		<button
																			onClick={() => {
																				let newArr = [...list];
																				newArr.splice(index, 1);
																				setList(newArr);
																			}}>
																			Del
																		</button>

																		<div>
																			<label>Office</label>
																			<select
																				name="staffEditOffice"
																				id="staffEditOffice"
																				defaultValue={li?.id?._id}
																				onChange={(e) => {
																					let newArr = [...list];
																					newArr[index].id = offices.find(
																						(option) =>
																							option._id === e.target.value
																					);
																					setList(() => newArr);
																				}}>
																				{offices?.map((o, i) => {
																					if (o?.region?._id === region?._id) {
																						return (
																							<option
																								key={o._id}
																								data={o._id}
																								value={o._id}>
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
																				{li.id?.tasks?.map((task, i) => {
																					return (
																						<span key={task + i}>
																							<input
																								type="checkbox"
																								name={`staffEditTasks${
																									task + i
																								}`}
																								value={li.id?.tasks[i]}
																								id={`staffEditTasks${
																									index + "-" + i
																								}`}
																								defaultChecked={li?.tasks?.includes(
																									task
																								)}
																								onChange={(e) => {
																									// Destructuring
																									const { value, checked } =
																										e.target;

																									let newArr = [...list];

																									// Case 1 : The user checks the box
																									if (checked) {
																										newArr[index].tasks = [
																											...newArr[index]?.tasks,
																											value,
																										];
																										setList(() => newArr);
																									}

																									// Case 2  : The user unchecks the box
																									else {
																										newArr[index].tasks =
																											newArr[
																												index
																											].tasks.filter(
																												(e) => e !== value
																											);
																										setList(() => newArr);
																									}
																								}}
																							/>
																							<label
																								htmlFor={`staffEditTasks${
																									index + "-" + i
																								}`}>
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
																newArr.push({});
																newArr[list.length].id = offices.find(
																	(o) => o?.region?._id === region?._id
																);
																newArr[list.length].tasks = [];
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
