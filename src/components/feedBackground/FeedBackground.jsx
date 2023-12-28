
import "./feedBackground.css";

export default function FeedBackground({children}) {
	return (
		<div className="feedBackground">
			<div className="feedBackgroundWrapper">
				{children}
			</div>
		</div>
	);
}
