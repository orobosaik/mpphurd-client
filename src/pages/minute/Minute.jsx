import "./minute.css";
import FeedBackground from "../../components/feedBackground/FeedBackground";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import RightBar from "../../components/rightbar/RightBar";
import MiddleBar from "../../components/middleBar/MiddleBar";
import PlanInfo from "../../components/planInfo/PlanInfo";
import FeedCard from "../../components/feedCard/FeedCard";
import Activities from "../../components/activities/Activities";
import Document from "../../components/document/Document";
import { useEffect, useState } from "react";
import TopBar from "../../components/topBar/TopBar";
import PlanBill from "../../components/planBill/PlanBill";
import GenerateBill from "../../components/generateBill/GenerateBill";
import PlanInfoCard from "../../components/planInfoCard/PlanInfoCard";
import axios from "axios";

import uuid from "react-uuid";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { getThemeColor } from "../../utilities/themeColor";
import { useDispatch } from "react-redux";
import { resetOfficeData } from "../../redux/appSlice";
import { CircularProgress } from "@mui/material";

export default function Minute() {
	const [rightBarView, setRightBarView] = useState(0);
	const [officeList, setOfficeList] = useState([]);
	const [loading, setLoading] = useState();

	const [proposedActions, setProposedActions] = useState([]);

	const navigate = useNavigate();
	const location = useLocation();
	const data = location.state;

	const themeColor = getThemeColor();
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const form = new FormData(e.target);
		// console.log(form.get("plan.PlotNo"));
		console.log(form);

		const newData = {
			status: form.get("minuteStatus"),
			text: form.get("minuteText"),
			proposedActions: form.get("proposedActions"),
			newOfficeId: form.get("minuteToOfficer"),
		};
		console.log(newData);

		axios.defaults.withCredentials = true;

		try {
			let host = import.meta.env.VITE_SERVER;
			const res = await axios.post(
				`${host}/staffs/plan/${data._id}/minute`,
				newData,
				{
					withCredentials: true,
				}
			);
			console.log(res.data);

			setLoading(false);

			dispatch(resetOfficeData());
			navigate(-2);

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
			setLoading(false);

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
	};

	useEffect(() => {
		axios.defaults.withCredentials = true;

		const getData = async () => {
			try {
				let host = import.meta.env.VITE_SERVER;

				const res = await Promise.all([
					axios.get(`${host}/staffs/office/all`, {
						withCredentials: true,
					}),
					axios.get(`${host}/staffs/staff/all`, {
						withCredentials: true,
					}),
				]);
				const office = res[0].data;
				const staff = res[1].data;

				let presentStaff = office.map((o) => {
					// Prevent showing current staff office
					if (o._id === data.currentOffice.id._id) return;
					let staffList = staff.filter((s) =>
						s.office.some((so) => so.id === o._id)
					);
					let text;
					if (staffList.length === 0) {
						text = `${o.region.code.toUpperCase()} - ${o.name} (Unavailable)`;
					} else if (staffList.length > 1) {
						text = `${o.region.code.toUpperCase()} - ${o.name} (Multiple)`;
					} else {
						text = `${o.region.code.toUpperCase()} - ${o.name} (${
							staffList[0].fullName
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
					presentStaff.sort((a, b) => {
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
		<>
			<div className="pageWrapper"></div>

			<Header />
			<div className="planContainer">
				<SideBar selected={"home"} />
				<MiddleBar
					topBarData={{
						action: "Minute Plan",
						planNumber: data?.planNumber
							? `${data?.dev.region.substring(0, 3).toUpperCase()}/${
									data?.planNumber.value
							  }/${new Date(data?.planNumber.date).getFullYear()}`
							: data?.uniqueId,
					}}>
					<div>
						<div className="minuteItems">
							<form action="" onSubmit={handleSubmit}>
								<div className="minuteItem">
									<label htmlFor="minuteStatus">Status:</label>
									<select name="minuteStatus" id="minuteStatus">
										<option value="">...</option>
										<option value="Process Further">Process Further</option>
										<option value="Issue Raised">Issue Raised</option>
										<option value="Recommended For Rejection">
											Recommended for Rejection
										</option>
									</select>
								</div>

								<div className="minuteItem">
									<label htmlFor="minuteText">Comment:</label>
									<textarea
										name="minuteText"
										id="minuteText"
										cols="30"
										rows="10"></textarea>
								</div>

								<div className="minuteItem">
									<span>Proposed Actions</span>
									<div className="minuteItemActions">
										{proposedActions.map((el, index) => {
											const keyId = uuid();
											return (
												<div key={keyId} className="minuteItemAction">
													<button
														type="button"
														onClick={() => {
															let newArr = [...proposedActions];
															newArr.splice(index, 1);
															setProposedActions(newArr);
														}}>
														-
													</button>
													<span>{index + 1}</span>
													<input
														id={"proposedAction" + (index + 1)}
														name={"proposedAction" + (index + 1)}
														type="text"
														value={proposedActions[index]}
														onChange={(e) => {
															let newArr = [...proposedActions];
															newArr[index] = e.target.value;
															setProposedActions(newArr);
														}}
													/>
												</div>
											);
										})}

										<button
											type="button"
											onClick={() => {
												let newArr = [...proposedActions];
												newArr.push("");
												setProposedActions(newArr);
											}}>
											+
										</button>
									</div>
								</div>

								<div className="minuteItem">
									<span>Select Officer/Office:</span>

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
								<button type="submit" className="primary">
									{loading ? (
										<CircularProgress
											thickness={5}
											size={20}
											sx={{ color: "white" }}
										/>
									) : (
										"Minute Plan"
									)}
								</button>
							</form>
						</div>
						<ToastContainer />
					</div>
				</MiddleBar>

				<RightBar>
					{rightBarView !== 1 ? (
						<Activities setRightBarView={setRightBarView} />
					) : (
						<Document setRightBarView={setRightBarView} />
					)}
				</RightBar>
			</div>
		</>
	);
}
