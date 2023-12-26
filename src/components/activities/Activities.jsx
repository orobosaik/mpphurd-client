import { useParams } from "react-router-dom";
import ActivityCard from "../activityCard/ActivityCard";
import "./activities.css";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingIcon from "../../utilities/LoadingIcon";

export default function Activities({ setRightBarView, setRightBarLoading }) {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	const [reload, setReload] = useState();
	const [err, setErr] = useState(false);
	const params = useParams();

	useEffect(() => {
		const getData = async () => {
			console.log(params);
			try {
				let host = import.meta.env.VITE_SERVER;
				const res = await axios.get(`${host}/staffs/plan/${params.id}`);

				setData(res.data);
				setIsLoading(false);
				console.log(res.data);
			} catch (error) {
				setIsLoading(false);
				setErr(true);
			}
		};

		getData();

		// return () => {
		// 	second
		// }
	}, [reload]);

	return (
		<div className="activities">
			<div className="activitiesTop">
				<span className="activitiesTopActive">Activities</span>
				<span onClick={() => setRightBarView(1)}>Documents</span>
			</div>
			<div className="activitiesLabels">
				<span className="activitiesLabelActive">All</span>
				<span>Minutes</span>
				<span>Actions</span>
				<span>Issues</span>
			</div>

			<div className="activitiesWrapper">
				{!isLoading ? (
					<>
						<ActivityCard />
						<ActivityCard comment={true} />
						<ActivityCard />
						<ActivityCard />
						<ActivityCard />
						<ActivityCard />
						<ActivityCard />
						<ActivityCard />
					</>
				) : (
					<LoadingIcon />
				)}
				{err && (
					<>
						<p>Error Occurred</p>
						<button onClick={setReload(() => [])}>Click to reload</button>
					</>
				)}
			</div>
		</div>
	);
}
