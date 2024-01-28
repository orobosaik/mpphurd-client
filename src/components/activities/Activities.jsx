import { useParams } from "react-router-dom";
import ActivityCard from "../activityCard/ActivityCard";
import "./activities.css";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingIcon from "../../utilities/LoadingIcon";
import ActivityCardModal from "../activityCardModal/ActivityCardModal";
import VettingCard from "../vettingCard/VettingCard";

function Activities({ setRightBarView, reload, isInUserOffice, admin }) {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [isAdmin, setIsAdmin] = useState(admin);
	const [dataList, setDataList] = useState([]);
	const [activityType, setActivityType] = useState("All");
	const [customError, setCustomError] = useState("No Record...");

	// const [fileInStaffOffice, setFileInStaffOffice] = useState(inUserOffice);

	const params = useParams();

	const categorizeActivities = (type) => {
		return type === "All" ? data : data.filter((e) => e.type === type);
	};
	const changeViewType = (e) => {
		const clicked = e.target.getAttribute("data-value");
		const clickMap = {
			All: 1,
			Minute: 2,
			Action: 3,
		};

		// Send only 3 items if file is not in user's office
		!isInUserOffice
			? setDataList([...categorizeActivities(clicked)].slice(0, 2))
			: setDataList(categorizeActivities(clicked)); // Else send everything

		// setActivityType(clickMap[clicked] || 4);
		setActivityType(clicked);
	};

	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			axios.defaults.withCredentials = true;
			try {
				let host = import.meta.env.VITE_SERVER;

				let res;
				if (!isAdmin) {
					res = await axios.get(`${host}/staffs/plan/${params.id}/activities`, {
						withCredentials: true,
					});
				} else {
					res = await axios.get(`${host}/admin/plan/${params.id}/activities`, {
						withCredentials: true,
					});
				}
				setData(res.data);

				// Send only 3 items if file is not in user's office
				!isInUserOffice
					? setDataList([...res.data].slice(0, 2))
					: setDataList(res.data); // Else send everything

				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				setCustomError(error.message || "Network Error");
			}
		};

		isInUserOffice !== undefined && getData();

		setTimeout(() => {
			if (isLoading) {
				setCustomError("Network Timeout...");
				setIsLoading(false);
			}
		}, 7000);

		// return () => {
		// 	second
		// }
	}, [reload, params.id, isInUserOffice]);

	const mockVettingData = {
		architect: {
			status: "Issue Raised",
			array: [
				{
					status: "Issue Raised",
					date: new Date(),
					staffName: "Gift Igbinosadion",
					staffId: "",
					comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quis quasi quas explicabo!",
				},
			],
		},
	};

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
						<VettingCard  data={""} header={"Architect"} />
						<VettingCard header={"E. Engineer"} />
						<VettingCard header={"M. Engineer"} />
						<VettingCard header={"S/C. Engineer"} />
						<VettingCard header={"Town Planner"} />

						<div className="printBtn">
							<button>Print Vetting Sheet</button>
							<button>Print Vetting Comment</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Activities;
