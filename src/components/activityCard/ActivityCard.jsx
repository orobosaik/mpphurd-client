import { useState } from "react";
import "./activityCard.css";
import { ExpandLessRounded, ExpandMoreRounded, LaunchRounded } from "@mui/icons-material";
import AddCommentModal from "../addCommentModal/AddCommentModal";
import ActivityCardModal from "../activityCardModal/ActivityCardModal";

export default function ActivityCard({ data }) {
	const [showComment, setShowComment] = useState(false);
	return (
		<div className="activityCard">

			<div className="activityCardArrow"></div>
			<h1>
				{" "}
				<span className="activityCardTypeTag">{data.type}</span>
			</h1>

			{/* <div className="activityCardViewMoreIcon">
				<LaunchRounded/>
			</div> */}
			{<ActivityCardModal stateData={data}/>}

			<div className="activityCardHead">
				<h2 className="title">
					{data.type === "Action" ? data.title : data.to?.office}
				</h2>
				<div className="date">15 Days Ago</div>
			</div>

			{data?.to?.staff && <p>{data.to.staff}</p>}

			{data?.from?.staff && (
				<div>
					<span className="activityCardTitle">From:</span>
					<span className="activityCardText">{`${data.from.office} (${data.from.staff})`}</span>
				</div>
			)}
			{data?.by?.staff && (
				<div>
					<span className="activityCardTitle">By:</span>
					<span className="activityCardText">{`${data.by.office} (${data.by.staff})`}</span>
				</div>
			)}
			{/* {data?.from?.staff && (
				<div>
					<span className="activityCardTitle">DIO:</span>{" "}
					<span className="activityCardText">45 Days</span>
				</div>
			)} */}

			{data?.comment?.status && (
				<div>
					<span className="activityCardTitle">Status:</span>{" "}
					<span className="activityCardText">{data?.comment?.status}</span>
				</div>
			)}

			{/* Show comment if available */}
			<div className="activityCardComment">
				{data?.comment?.text && (
					<div
						className="activityCardCommentButton"
						onClick={() => setShowComment(!showComment)}>
						<span>Comment</span>
						{showComment ? (
							<ExpandLessRounded className="activityCardCommentButtonIcon" />
						) : (
							<ExpandMoreRounded className="activityCardCommentButtonIcon" />
						)}
					</div>
				)}

				{showComment && (
					<p className="activityCardCommentText">{data?.comment?.text}</p>
				)}
			</div>
		</div>
	);
}
