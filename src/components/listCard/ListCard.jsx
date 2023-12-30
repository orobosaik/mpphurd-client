import { Link, useLocation, useNavigate } from "react-router-dom";
import "./listCard.css";
import { useDispatch } from "react-redux";
import { setOfficeData } from "../../redux/appSlice";
import { useRef } from "react";

function ListCard({ data, officeState, scrollSection }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	return (
		<div
			className="listCard listFormat"
			onClick={() => {
				// console.log(scrollSection())
				console.log(scrollSection);
				console.log(scrollSection.current.scrollTop);
				console.log(scrollSection.current.clientHeight);

				{
				}
				dispatch(
					setOfficeData({
						...officeState,
						scroll: scrollSection.current.scrollTop,
					})
				);
				navigate(`/permit/${data?._id}`, { state: data });
			}}>
			<span>{data?.planNumber || data?.uniqueId}</span>
			<span>{data.applicant.name}</span>
			<span>{data.dev.plotNo + " " + data.dev.address}</span>
			<span>{data.dev.use}</span>
			<span>Yes</span>
			<span>A5</span>
		</div>
	);
}

export default ListCard;
