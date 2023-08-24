import { Link } from "react-router-dom";
import "./feedCard.css";

export default function FeedCard({count, title, office}) {
	return (
		<Link className="feedCard" to="./new">
			<div className="feedCardWrapper">
				<span className="feedCardBadge">{count}</span>
				<span className="feedCardText">
					{title}
				</span>
				<span className="feedCardOffice">
					({office})
				</span>
			</div>
		</Link>
	);
}
