import ActivityCard from "../activityCard/ActivityCard";
import "./activities.css";

export default function Activities({ setRightBarView }) {
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
				<ActivityCard/>
				<ActivityCard comment={true}/>
				<ActivityCard/>
				<ActivityCard/>
				<ActivityCard/>
				<ActivityCard/>
				<ActivityCard/>
				<ActivityCard/>
			</div>
		</div>
	);
}
