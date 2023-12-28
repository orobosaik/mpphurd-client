import { Link } from "react-router-dom";
import "./feedCard.css";

function FeedCard({
	count = false,
	priText = false,
	secText = false,
	route,
	data,
}) {
	return (
		<Link className="feedCard" state={data} to={route}>
			{console.log}
			{count && <span className="feedCardBadge">{count}</span>}

			<div className="feedCardWrapper">
				{priText && <span className="feedCardText">{priText}</span>}
				{secText && <span className="feedCardOffice">({secText})</span>}
			</div>
		</Link>
	);
}

export default FeedCard;
