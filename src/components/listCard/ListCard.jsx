import { Link, useLocation } from "react-router-dom";
import "./listCard.css";

function ListCard({data}) {
	return (
		<Link
			className="listCard listFormat"
			to={`/permit/${data?._id}`}>
			<span>{data?.planNumber || data?.uniqueId}</span>
			<span>{data.applicant.name}</span>
			<span>
				{data.dev.plotNo+" "+data.dev.address}
			</span>
			<span>{data.dev.use}</span>
			<span>Yes</span>
			<span>A5</span>
		</Link>
	);
}

export default ListCard;
