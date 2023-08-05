import "./feedCard.css";

export default function FeedCard() {
	return (
		<div className="feedCard">
			<div className="feedCardWrapper">
				<span className="feedCardBadge">454</span>
				<span className="feedCardText">
					Files Awaiting Town Planner's Action
				</span>
				<span className="feedCardOffice">
					(Zone 6)
				</span>
			</div>
		</div>
	);
}
