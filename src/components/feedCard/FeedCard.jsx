import { Link, useNavigate } from "react-router-dom";
import "./feedCard.css";
import { useDispatch } from "react-redux";
import { resetOfficeData, setOfficeData } from "../../redux/appSlice";
import { useEffect } from "react";

function FeedCard({
	count = false,
	priText = false,
	secText = false,
	route,
	data,
}) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (
		<div
			className="feedCard"
			onClick={() => {
				dispatch(resetOfficeData());
				navigate(route, { state: data });
			}}>

			{count && <span className="feedCardBadge">{count}</span>}
			<div className="feedCardWrapper">
				{priText && <span className="feedCardText">{priText}</span>}
				{secText && <span className="feedCardOffice">({secText})</span>}
			</div>
		</div>
	);
}

export default FeedCard;
