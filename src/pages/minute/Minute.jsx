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
import { useEffect, useState, useRef } from "react";
import TopBar from "../../components/topBar/TopBar";
import PlanBill from "../../components/planBill/PlanBill";
import GenerateBill from "../../components/generateBill/GenerateBill";
import PlanInfoCard from "../../components/planInfoCard/PlanInfoCard";
import axios from "axios";

import uuid from "react-uuid";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getThemeColor } from "../../utilities/themeColor";
import { useDispatch, useSelector } from "react-redux";
import { resetOfficeData } from "../../redux/appSlice";
import { CircularProgress } from "@mui/material";
import { MINUTE_STATUS_LIST } from "../../utilities/appData";
import TextEditor from "../../widgets/textEditor/TextEditor";

export default function Minute() {
	const [rightBarView, setRightBarView] = useState(0);
	const [officeList, setOfficeList] = useState([]);
	const [loading, setLoading] = useState();
	const [reload, setReload] = useState();
	const [planData, setPlanData] = useState();

	const [isInUserOffice, setIsInUserOffice] = useState();
	const { currentUser } = useSelector((state) => state.user);
	const params = useParams();

	const [proposedActions, setProposedActions] = useState([]);

	const navigate = useNavigate();
	const location = useLocation();
	const data = location.state;

	const themeColor = getThemeColor();
	const dispatch = useDispatch();

	const editorRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const form = new FormData(e.target);

		const content = editorRef.current.getContent();

		const newData = {
			status: form.get("minuteStatus"),
			text: content,
			proposedActions: form.get("proposedActions"),
			newOfficeId: form.get("minuteToOfficer"),
		};
		// console.log(newData);

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
			// console.log(res.data);

			setLoading(false);

			dispatch(resetOfficeData());
			navigate(-2);

			setTimeout(() => {
				toast.success(res.data, {});
			}, 200);
		} catch (error) {
			setLoading(false);

			let message = error.response
				? error.response.data.message
				: error.message;
			// console.log(error);
			// console.log(message);

			toast.error(message, {});
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
					axios.get(`${host}/staffs/plan/${params.id}`),
				]);

				const office = res[0].data;
				const staff = res[1].data;
				const planData = res[2].data;

				setPlanData(planData);

				// Check if Plan is in User Office(s)
				setIsInUserOffice(
					currentUser.office.some((e) => {
						return planData.currentOffice?.id?._id === e?.id?._id;
					}) || currentUser?.isManagement === true
				);

				let presentStaff = office.map((o) => {
					// Prevent showing current staff office
					if (o._id === data.currentOffice.id._id) return;
					let staffList = staff.filter((s) =>
						s.office.some((so) => so.id === o._id)
					);
					let text;
					if (staffList.length === 0) {
						text = `${o.name}`;
					} else if (staffList.length > 1) {
						text = `${o.name} (Multiple)`;
					} else {
						text = `${o.name} (${staffList[0].fullName})`;
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
				// console.log(error);
				// console.log(message);
			}
		};
		getData();
	}, []);

	return (
		<>
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
									<select required name="minuteStatus" id="minuteStatus">
										<option value="">...</option>
										{MINUTE_STATUS_LIST.map((e) => {
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
										rows="10"></textarea> */}
									<TextEditor className="quill-editor" ref={editorRef} />
								</div>

								<div className="minuteItem">
									<span>Proposed Actions</span>
									<div className="minuteItemActions">
										{proposedActions.map((el, index) => {
											const keyId = uuid();
											return (
												<div key={index} className="minuteItemAction">
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

									<select required name="minuteToOfficer" id="minuteToOfficer">
										<option value=""></option>
										{planData?.currentOffice?.id?.name.toUpperCase() ===
										"CLEARING HOUSE"
											? officeList.map((o) => {
													if (o?.office.name === "ASSESSMENT") {
														return (
															<option key={o.officeId} value={o.officeId}>
																{o.text}
															</option>
														);
													}
											  })
											: officeList.map((o) => {
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
					</div>
				</MiddleBar>

				<RightBar>
					{rightBarView !== 1 ? (
						<Activities
							isInUserOffice={isInUserOffice}
							reload={setReload}
							setRightBarView={setRightBarView}
							plan={data}
						/>
					) : (
						<Document setRightBarView={setRightBarView} />
					)}
				</RightBar>
			</div>
		</>
	);
}
