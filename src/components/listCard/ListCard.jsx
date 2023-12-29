import { Link, useLocation, useNavigate } from "react-router-dom";
import "./listCard.css";
import { useDispatch } from "react-redux";
import { setOfficeData } from "../../redux/appSlice";
import { useRef } from "react";

function ListCard({ data, officeState, scrollPosition }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const scrollPos = useRef();
	return (
		<div
			ref={scrollPos}
			className="listCard listFormat"
			onClick={() => {
				// console.log(scrollPosition())
				console.log(scrollPos.current.offsetHeight);
				// const getSP = scrollPosition.current
				dispatch(setOfficeData(officeState));
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
