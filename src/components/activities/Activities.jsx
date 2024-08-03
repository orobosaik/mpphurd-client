import { useParams } from "react-router-dom";
import ActivityCard from "../activityCard/ActivityCard";
import "./activities.css";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingIcon from "../../utilities/LoadingIcon";
import ActivityCardModal from "../activityCardModal/ActivityCardModal";
import VettingCard from "../vettingCard/VettingCard";
import PrintWrapper from "../../widgets/printWrapper/PrintWrapper";
import { toast } from "react-toastify";
import { getThemeColor } from "../../utilities/themeColor";
import { useSelector } from "react-redux";
import { format } from "date-fns";

function Activities({ setRightBarView, reload, admin, reloadFromPlan }) {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [isAdmin, setIsAdmin] = useState(admin);
	const [dataList, setDataList] = useState([]);
	const [activityType, setActivityType] = useState("All");
	const [customError, setCustomError] = useState("No Record...");
	const [plan, setPlan] = useState();
	const [reloadActivities, setReloadActivities] = useState();

	const [isInUserOffice, setIsInUserOffice] = useState();
	const { currentUser, loading } = useSelector((state) => state.user);
	const { currentAdmin } = useSelector((state) => state.admin);

	const params = useParams();
	const themeColor = getThemeColor();

	// 	plan?.vetting.architect.status ||
	// 	plan?.vetting.mechanicalEngineer.status ||
	// 	plan?.vetting.electricalEngineer.status ||
	// 	plan?.vetting.civilEngineer.status ||
	// 	plan?.vetting.townPlanner.status

	// isInUserOffice

	const isPrintNotAllowed = (plan) => {
		// Check if all professionals have vetted and if plan is in user office or user is an admin
		// console.log(plan);
		if (
			!(
				plan?.vetting?.architect?.status?.toLowerCase() === "no action" ||
				plan?.vetting?.mechanicalEngineer?.status?.toLowerCase() ===
					"no action" ||
				plan?.vetting?.electricalEngineer?.status?.toLowerCase() ===
					"no action" ||
				plan?.vetting?.civilEngineer?.status?.toLowerCase() === "no action" ||
				plan?.vetting?.townPlanner?.status?.toLowerCase() === "no action"
			) &&
			isInUserOffice
		) {
			// console.log("Condition met");
			return false;
		} else {
			// console.log("Condition not met");
			return true;
		}
	};

	const vettingCommentPrintView = () => {
		return (
			<div className="vettingCommentSheet">
				<div className="date">Printed: {format(new Date(), "dd/MM/yyyy")}</div>
				<h1 className="header">Vetting Comment Sheet</h1>

				<div className="detailsWrapper">
					<div className="details">
						<div className="detailsItem">
							<span className="detailsItem-name">Plan Number:</span>
							<span className="detailsItem-value">
								{plan?.planNumber?.fullValue || plan?.uniqueId}
							</span>
						</div>
						<div className="detailsItem">
							<span className="detailsItem-name">Applicant Name:</span>
							<span className="detailsItem-value">
								{plan?.applicant?.name?.toLowerCase()}
							</span>
						</div>
						<div className="detailsItem">
							<span className="detailsItem-name">Development Address:</span>
							<span className="detailsItem-value">
								{" "}
								{plan?.dev?.plotNo && plan?.dev?.plotNo + ","}{" "}
								{plan?.dev?.address && plan?.dev?.address?.toLowerCase()}
							</span>
						</div>
						<div className="detailsItem">
							<span className="detailsItem-name">Development Type:</span>
							<span className="detailsItem-value">{plan?.dev?.type}</span>
						</div>
					</div>

					<h2 className="header2">Comments</h2>

					<div className="comments-wrapper">
						{/* ARCHITECT */}
						{!(
							plan?.vetting?.architect?.status?.toLowerCase() === "cleared" ||
							plan?.vetting?.architect?.status?.toLowerCase() ===
								"process further"
						) && (
							<>
								<div className="comments">
									<p className="comment-type">Architect</p>

									{plan?.vetting?.architect?.items?.map((e, index) => {
										if (
											e.status.toLowerCase() !== "cleared" ||
											e.status.toLowerCase() !== "process further"
										) {
											return (
												<div className="comment-body">
													<div className="comment-body-item">
														<span className="comment-number">{index + 1}</span>
														<span className="comment-text">{e.comment}</span>
													</div>
												</div>
											);
										}
									})}
								</div>
							</>
						)}

						{/* CIVIL ENGINEER */}
						{!(
							plan?.vetting?.civilEngineer?.status?.toLowerCase() ===
								"cleared" ||
							plan?.vetting?.civilEngineer?.status?.toLowerCase() ===
								"process further"
						) && (
							<>
								<div className="comments">
									<p className="comment-type">Civil Engineer</p>

									{plan?.vetting?.civilEngineer?.items?.map((e, index) => {
										if (
											e.status.toLowerCase() !== "cleared" ||
											e.status.toLowerCase() !== "process further"
										) {
											return (
												<div className="comment-body">
													<div className="comment-body-item">
														<span className="comment-number">{index + 1}</span>
														<span className="comment-text">{e.comment}</span>
													</div>
												</div>
											);
										}
									})}
								</div>
							</>
						)}

						{/* ELECTRICAL ENGINEER */}
						{!(
							plan?.vetting?.electricalEngineer?.status?.toLowerCase() ===
								"cleared" ||
							plan?.vetting?.electricalEngineer?.status?.toLowerCase() ===
								"process further"
						) && (
							<>
								<div className="comments">
									<p className="comment-type">Electrical Engineer</p>

									{plan?.vetting?.electricalEngineer?.items?.map((e, index) => {
										if (
											e.status.toLowerCase() !== "cleared" ||
											e.status.toLowerCase() !== "process further"
										) {
											return (
												<div className="comment-body">
													<div className="comment-body-item">
														<span className="comment-number">{index + 1}</span>
														<span className="comment-text">{e.comment}</span>
													</div>
												</div>
											);
										}
									})}
								</div>
							</>
						)}

						{/* MECHANICAL ENGINEER */}
						{!(
							plan?.vetting?.mechanicalEngineer?.status?.toLowerCase() ===
								"cleared" ||
							plan?.vetting?.mechanicalEngineer?.status?.toLowerCase() ===
								"process further"
						) && (
							<>
								<div className="comments">
									<p className="comment-type">Mechanical Engineer</p>

									{plan?.vetting?.mechanicalEngineer?.items?.map((e, index) => {
										if (
											e.status.toLowerCase() !== "cleared" ||
											e.status.toLowerCase() !== "process further"
										) {
											return (
												<div className="comment-body">
													<div className="comment-body-item">
														<span className="comment-number">{index + 1}</span>
														<span className="comment-text">{e.comment}</span>
													</div>
												</div>
											);
										}
									})}
								</div>
							</>
						)}
						{/* TOWN PLANNER */}
						{!(
							plan?.vetting?.townPlanner?.status?.toLowerCase() === "cleared" ||
							plan?.vetting?.townPlanner?.status?.toLowerCase() ===
								"process further"
						) && (
							<>
								<div className="comments">
									<p className="comment-type">Town Planner</p>

									{plan?.vetting?.townPlanner?.items?.map((e, index) => {
										if (
											e.status.toLowerCase() !== "cleared" ||
											e.status.toLowerCase() !== "process further"
										) {
											return (
												<div className="comment-body">
													<div className="comment-body-item">
														<span className="comment-number">{index + 1}</span>
														<span className="comment-text">{e.comment}</span>
													</div>
												</div>
											);
										}
									})}
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		);
	};

	const getData = async () => {
		try {
			let host = import.meta.env.VITE_SERVER;

			let res;
			if (!isAdmin) {
				res = await Promise.all([
					axios.get(`${host}/staffs/plan/${params.id}/activities`),
					axios.get(`${host}/staffs/plan/${params.id}`),
				]);
			} else {
				res = await Promise.all([
					axios.get(`${host}/admin/plan/${params.id}/activities`),
					axios.get(`${host}/admin/plan/${params.id}`),
				]);
			}

			const activitiesData = res[0].data;
			// const returnedPlan = res[1].data;
			let plan = res[1].data;
			setPlan(plan);

			// console.log(res);

			// Check if Plan is in User Office(s)
			const fileInUserOffice =
				currentUser?.office?.some((e) => {
					return plan?.currentOffice?.id?._id === e?.id?._id;
				}) ||
				currentUser?.isManagement === true ||
				currentAdmin;
			setIsInUserOffice(fileInUserOffice);

			setData(activitiesData);

			// Send only 3 items if file is not in user's office
			!fileInUserOffice
				? setDataList([...activitiesData].slice(0, 2))
				: setDataList(activitiesData); // Else send everything

			setIsLoading(false);
			// console.log(activitiesData);
		} catch (error) {
			let message = error.response
				? error.response.data.message
				: error.message;
			// console.log(error);
			// console.log(message);

			setCustomError(error.message || "Network Error");

			setTimeout(() => {
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
			}, 0);
			setIsLoading(false);
		}
	};

	const categorizeActivities = (type) => {
		return type === "All" ? data : data.filter((e) => e.type === type);
	};
	const changeViewType = (e) => {
		const clicked = e.target.getAttribute("data-value");

		// Send only 3 items if file is not in user's office
		!isInUserOffice
			? setDataList([...categorizeActivities(clicked)].slice(0, 2))
			: setDataList(categorizeActivities(clicked)); // Else send everything

		// setActivityType(clickMap[clicked] || 4);
		setActivityType(clicked);
	};

	useEffect(() => {
		setIsLoading(true);
		// setPlanData(plan);
		// if (plan) {
		// getData();
		// }
	}, []);

	useEffect(() => {
		getData();
	}, [reloadActivities, reload, params.id, reloadFromPlan]);

	return (
		<div className="activities">
			<div className="activitiesTop">
				<span className="activitiesTopActive">Activities</span>
				<span onClick={() => setRightBarView(1)}>Documents</span>
			</div>
			<div className="activitiesLabels">
				<span
					data-value="All"
					className={activityType === "All" ? "activitiesLabelActive" : ""}
					onClick={changeViewType}>
					All
				</span>

				<span
					data-value="Minute"
					className={activityType === "Minute" ? "activitiesLabelActive" : ""}
					onClick={changeViewType}>
					Minutes
				</span>

				<span
					data-value="Action"
					className={activityType === "Action" ? "activitiesLabelActive" : ""}
					onClick={changeViewType}>
					Actions
				</span>

				<span
					data-value="Vetting"
					className={activityType === "Vetting" ? "activitiesLabelActive" : ""}
					onClick={changeViewType}>
					Vetting
				</span>
			</div>

			<div className={`activitiesWrapper ${activityType.toLowerCase()}`}>
				{isLoading && <LoadingIcon />}

				{!isLoading &&
					(dataList.length < 1 &&
					!isLoading &&
					activityType.toLowerCase() !== "vetting" ? (
						<div className="empty">
							<p>{customError}</p>
						</div>
					) : (
						activityType.toLowerCase() !== "vetting" && (
							<>
								{dataList.map((d) => {
									return <ActivityCard key={d._id} data={d} />;
									// return  <ActivityCardModal key={d._id} data={d}/>;
								})}
								{!isInUserOffice && (
									<span className="limited-activity">
										<span>Limited View</span>
									</span>
								)}
							</>
						)
					))}

				{activityType.toLowerCase() === "vetting" && !isLoading && (
					<>
						<VettingCard
							reload={reload}
							reloadActivities={setReloadActivities}
							data={{
								plan: plan,
								vetting: plan?.vetting?.architect,
							}}
							header={{
								jobTitle: "Architect",
								title: "Architect",
							}}
						/>
						<VettingCard
							reload={reload}
							reloadActivities={setReloadActivities}
							data={{
								plan: plan,
								vetting: plan?.vetting?.electricalEngineer,
							}}
							header={{
								jobTitle: "Electrical Engineer",
								title: "Elect. Engr",
							}}
						/>
						<VettingCard
							reload={reload}
							reloadActivities={setReloadActivities}
							data={{
								plan: plan,
								vetting: plan?.vetting?.mechanicalEngineer,
							}}
							header={{
								jobTitle: "Mechanical Engineer",
								title: "Mech. Engr",
							}}
						/>
						<VettingCard
							reload={reload}
							reloadActivities={setReloadActivities}
							data={{
								plan: plan,
								vetting: plan?.vetting?.civilEngineer,
							}}
							header={{
								jobTitle: "Civil Engineer",
								title: "Civil Engr",
							}}
						/>
						<VettingCard
							reload={reload}
							reloadActivities={setReloadActivities}
							data={{
								plan: plan,
								vetting: plan?.vetting?.townPlanner,
							}}
							header={{
								jobTitle: "Town Planning Officer",
								title: "Town Planner",
							}}
						/>

						<div className="printBtn">
							<PrintWrapper
								title={`vetting_Comment_${plan?.planNumber?.fullValue}`}
								classes={"btn"}
								label={"Print Vetting Sheet"}
								// content={vettingCommentPrintView()}
								error={isPrintNotAllowed(plan)}
							/>
							<PrintWrapper
								title={`vetting_Comment_${plan?.planNumber?.fullValue}`}
								classes={"btn"}
								label={"Print Comment Sheet"}
								content={vettingCommentPrintView()}
								error={isPrintNotAllowed(plan)}
							/>
						</div>

						<br />
					</>
				)}
			</div>
		</div>
	);
}

export default Activities;
