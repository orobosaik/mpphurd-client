import { useState } from "react";
import "./activityCard.css";
import { ExpandLessRounded, ExpandMoreRounded } from "@mui/icons-material";

export default function ActivityCard({ comment }) {
	const [showComment, setShowComment] = useState(false);
	return (
		<div className="activityCard">
			<div className="activityCardArrow"></div>
			<h2>Orobosa Ikponmwosa (TPOII)</h2>

			<div className="activityCardDate">68 Days Ago</div>
			<div>
				<span className="activityCardTitle">From:</span>
				<span className="activityCardText">Enabulele Henry (Dir. DDC)</span>
			</div>
			<div>
				<span className="activityCardTitle">DIO:</span>{" "}
				<span className="activityCardText">45 Days</span>
			</div>
			<div>
				<span className="activityCardTitle">Status:</span>{" "}
				<span className="activityCardText">Issue Raised</span>
			</div>

			<div className="activityCardComment">
				{comment && (
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
					<p className="activityCardCommentText">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
						officia odio, accusamus adipisci laboriosam ea iusto ducimus placeat
						laudantium ut aspernatur nam veniam expedita. Harum aspernatur
						accusantium at fuga temporibus?
					</p>
				)}
			</div>
		</div>
	);
}
