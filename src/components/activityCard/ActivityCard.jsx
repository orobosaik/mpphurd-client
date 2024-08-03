import { useState } from "react";
import { dangerouslySetInnerHTML } from "react";
import "./activityCard.css";
import {
	ExpandLessRounded,
	ExpandMoreRounded,
	LaunchRounded,
} from "@mui/icons-material";
import AddCommentModal from "../addCommentModal/AddCommentModal";
import ActivityCardModal from "../activityCardModal/ActivityCardModal";
import {
	format,
	isToday,
	isYesterday,
	isTomorrow,
	formatDistance,
	formatRelative,
	subDays,
} from "date-fns";

export default function ActivityCard({ data }) {
	const [showComment, setShowComment] = useState(false);
	const displayDate = (originalDate) => {
		if (isToday(originalDate)) {
			return <span className="date">Today</span>;
		} else if (isYesterday(originalDate)) {
			return <span className="date">Yesterday</span>;
		} else {
			return (
				<span className="date">{format(originalDate, "MMM d, yyyy")}</span>
			);
		}
	};
	// const displayDate = (originalDate) => {
	// 	if (isToday(originalDate)) {
	// 		return `Today at ${format(originalDate, "HH:mm")}`;
	// 	} else if (isYesterday(originalDate)) {
	// 		return `Yesterday at ${format(originalDate, "HH:mm")}`;
	// 	} else if (isTomorrow(originalDate)) {
	// 		return `Tomorrow at ${format(originalDate, "HH:mm")}`;
	// 	} else {
	// 		return `${format(originalDate, "dd/MM/yyyy")} at ${format(
	// 			originalDate,
	// 			"HH:mm"
	// 		)}`;
	// 	}
	// };
	return (
		<div className="activityCard">
			<div className="activityCardArrow"></div>
			<h1>
				{" "}
				<span className={`activityCardTypeTag ${data.type}`}>{data.type}</span>
			</h1>

			{/* <div className="activityCardViewMoreIcon">
				<LaunchRounded/>
			</div> */}
			{<ActivityCardModal stateData={data} />}

			<div className="activityCardHead">
				<h2 className="title">
					{data.type === "Minute" ? data.to?.office : data.title}
				</h2>
				{displayDate(data.createdAt)}
			</div>

			{/* {data?.to?.staff && <p>{data.to.staff}</p>} */}

			{data?.from?.office && (
				<div>
					<span className="activityCardTitle">From:</span>
					<span className="activityCardText">{`${data.from.office}`}</span>
					{/* <span className="activityCardText">{`${data.from.office} (${data.from.staff})`}</span> */}
				</div>
			)}
			{data?.by?.office && (
				<div>
					<span className="activityCardTitle">By:</span>
					<span className="activityCardText">{`${data.by.office} `}</span>
					{/* <span className="activityCardText">{`${data.by.office} (${data.by.staff})`}</span> */}
				</div>
			)}

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
					// <div className="activityCardCommentText">{data?.comment?.text}</div>
					<div
						className="activityCardCommentText"
						dangerouslySetInnerHTML={{
							__html: data?.comment?.text,
						}}
					/>
				)}
			</div>
		</div>
	);
}
