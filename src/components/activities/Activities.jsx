import { useParams } from "react-router-dom";
import ActivityCard from "../activityCard/ActivityCard";
import "./activities.css";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingIcon from "../../utilities/LoadingIcon";
import ActivityCardModal from "../activityCardModal/ActivityCardModal";

function Activities({ setRightBarView, reload, isInUserOffice, admin }) {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);
	const [isAdmin, setIsAdmin] = useState(admin);
	const [dataList, setDataList] = useState([]);
	const [activityType, setActivityType] = useState(1);
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

		setActivityType(clickMap[clicked] || 4);
	};

	useEffect(() => {
		setIsLoading(true);
		const getData = async () => {
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

				// Send only 3 items if file is not in user's office
				!isInUserOffice
					? setDataList([...res.data].slice(0, 2))
					: setDataList(res.data); // Else send everything

				setData(res.data);

				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
			}
		};

		isInUserOffice !== undefined && getData();

		// return () => {
		// 	second
		// }
	}, [reload, params.id, isInUserOffice]);

	return (
		<div className="activities">
			<div className="activitiesTop">
				<span className="activitiesTopActive">Activities</span>
				<span onClick={() => setRightBarView(1)}>Documents</span>
			</div>
			<div className="activitiesLabels">
				<span
					data-value="All"
					className={activityType === 1 ? "activitiesLabelActive" : ""}
					onClick={changeViewType}>
					All
				</span>

				<span
					data-value="Minute"
					className={activityType === 2 ? "activitiesLabelActive" : ""}
					onClick={changeViewType}>
					Minutes
				</span>

				<span
					data-value="Action"
					className={activityType === 3 ? "activitiesLabelActive" : ""}
					onClick={changeViewType}>
					Actions
				</span>

				<span
					data-value="Issue"
					className={activityType === 4 ? "activitiesLabelActive" : ""}
					onClick={changeViewType}>
					Issues
				</span>
			</div>

			<div className="activitiesWrapper">
				{isLoading && <LoadingIcon />}

				{!isLoading &&
					(dataList.length < 1 && !isLoading ? (
						<div className="empty">
							<p>No Record...</p>
						</div>
					) : (
						dataList.map((d) => {
							return <ActivityCard key={d._id} data={d} />;
							// return  <ActivityCardModal key={d._id} data={d}/>;
						})
					))}
			</div>
		</div>
	);
}

export default Activities;
