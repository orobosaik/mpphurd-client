import { useState } from "react";
import "./minuteCard.css";
import { ExpandLessRounded, ExpandMoreRounded } from "@mui/icons-material";

export default function MinuteCard({ comment }) {
	const [showComment, setShowComment] = useState(false);
	return (
		<div className="minuteCard">
			<div className="minuteCardArrow"></div>
			<h2>Orobosa Ikponmwosa (TPOII)</h2>

			<div className="minuteCardDate">68 Days Ago</div>
			<div>
				<span className="minuteCardTitle">From:</span>
				<span className="miniteCardText">Enabulele Henry (Dir. DDC)</span>
			</div>
			<div>
				<span className="minuteCardTitle">DIO:</span>{" "}
				<span className="miniteCardText">45 Days</span>
			</div>
			<div>
				<span className="minuteCardTitle">Status:</span>{" "}
				<span className="miniteCardText">Issue Raised</span>
			</div>

			<div className="minuteCardComment">
				{comment && (
					<div
						className="minuteCardCommentButton"
						onClick={() => setShowComment(!showComment)}>
						<span>Comment</span>
						{showComment ? (
							<ExpandLessRounded className="minuteCardCommentButtonIcon" />
						) : (
							<ExpandMoreRounded className="minuteCardCommentButtonIcon" />
						)}
					</div>
				)}

				{showComment && (
					<p className="minuteCardCommentText">
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
