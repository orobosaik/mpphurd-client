import { useParams } from "react-router-dom";
import ActivityCard from "../activityCard/ActivityCard";
import "./activities.css";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingIcon from "../../utilities/LoadingIcon";
import ActivityCardModal from "../activityCardModal/ActivityCardModal";
import VettingCard from "../vettingCard/VettingCard";
import PrintWrapper from "../printWrapper/PrintWrapper";
import { toast } from "react-toastify";
import { getThemeColor } from "../../utilities/themeColor";
import { useSelector } from "react-redux";

function Activities({ setRightBarView, reload, admin, plan }) {
	const [isLoading, setIsLoading] = useState(false);
	const [planData, setPlanData] = useState(plan);
	const [data, setData] = useState([]);
	const [isAdmin, setIsAdmin] = useState(admin);
	const [dataList, setDataList] = useState([]);
	const [activityType, setActivityType] = useState("All");
	const [customError, setCustomError] = useState("No Record...");

	const [isInUserOffice, setIsInUserOffice] = useState();

	const { currentUser, loading } = useSelector((state) => state.user);

	// const [fileInStaffOffice, setFileInStaffOffice] = useState(inUserOffice);

	const params = useParams();
	const themeColor = getThemeColor();

	const getData = async () => {
		// setIsLoading(true);

		try {
			let host = import.meta.env.VITE_SERVER;

			let res;
			if (!isAdmin) {
				res = await Promise.all([
					axios.get(`${host}/staffs/plan/${params.id}/activities`),
					// axios.get(`${host}/staffs/plan/${params.id}`),
				]);
			} else {
				res = await Promise.all([
					axios.get(`${host}/admin/plan/${params.id}/activities`),
					// axios.get(`${host}/staffs/plan/${params.id}`),
				]);
			}

			const activitiesData = res[0].data;
			// const returnedPlan = res[1].data;

			console.log(res);

			// Check if Plan is in User Office(s)
			const fileInUserOffice =
				currentUser.office.some((e) => {
					return plan?.currentOffice?.id?._id === e?.id?._id;
				}) || currentUser?.isManagement === true;
			setIsInUserOffice(fileInUserOffice);

			setData(activitiesData);
			setPlanData(plan);

			// Send only 3 items if file is not in user's office
			!fileInUserOffice
				? setDataList([...activitiesData].slice(0, 2))
				: setDataList(activitiesData); // Else send everything

			setIsLoading(false);
			console.log(activitiesData);
		} catch (error) {
			let message = error.response
				? error.response.data.message
				: error.message;
			console.log(error);
			console.log(message);

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
		// 	getData();
		// }
	}, []);

	useEffect(() => {
		setPlanData(plan);
		plan && getData();
	}, [plan, reload, params.id]);

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
						activityType.toLowerCase() !== "vetting" &&
						dataList.map((d) => {
							return <ActivityCard key={d._id} data={d} />;
							// return  <ActivityCardModal key={d._id} data={d}/>;
						})
					))}
				{activityType.toLowerCase() === "vetting" && (
					<>
						<VettingCard
							reload={reload}
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
							data={{
								plan: plan,
								vetting: plan?.vetting?.electricalEngineer,
							}}
							header={{
								jobTitle: "Electrical Engineer",
								title: "E. Engineer",
							}}
						/>
						<VettingCard
							reload={reload}
							data={{
								plan: plan,
								vetting: plan?.vetting?.mechanicalEngineer,
							}}
							header={{
								jobTitle: "Mechanical Engineer",
								title: "M. Engineer",
							}}
						/>
						<VettingCard
							reload={reload}
							data={{
								plan: plan,
								vetting: plan?.vetting?.civilEngineer,
							}}
							header={{
								jobTitle: "S/C Engineer",
								title: "S/C. Engineer",
							}}
						/>
						<VettingCard
							reload={reload}
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
							<PrintWrapper classes={"btn"} label={"Print Vetting Sheet"} />
							<PrintWrapper classes={"btn"} label={"Print Vetting Comment"} />
						</div>

						<br />
						<PrintWrapper classes={"btn"} label={"testing label"} />
					</>
				)}
			</div>
		</div>
	);
}

export default Activities;
