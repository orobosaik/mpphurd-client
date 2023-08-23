import "./feedCard.css";

export default function FeedCard({count, title, office}) {
	return (
		<div className="feedCard">
			<div className="feedCardWrapper">
				<span className="feedCardBadge">{count}</span>
				<span className="feedCardText">
					{title}
				</span>
				<span className="feedCardOffice">
					({office})
				</span>
			</div>
		</div>
	);
}
