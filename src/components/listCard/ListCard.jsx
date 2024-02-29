import { Link, useLocation, useNavigate } from "react-router-dom";
import "./listCard.css";
import { useDispatch } from "react-redux";
import { setOfficeData } from "../../redux/appSlice";
import { useRef } from "react";

function ListCard({ data, officeState, scrollSection, type, reload }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	return (
		<>
			<div
				className="listCard listFormat"
				onClick={() => {
					// console.log(scrollSection())
					// console.log(scrollSection);
					// console.log(scrollSection.current.scrollTop);
					// console.log(scrollSection.current.clientHeight);

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
				<span>
					{data?.planNumber
						? `${data?.planNumber?.value} / ${new Date(
								data?.planNumber?.date
						  ).getFullYear()}`
						: data?.uniqueId}
				</span>
				<span>{data?.applicant?.name}</span>
				<span>
					{" "}
					{data.dev?.plotNo && data.dev?.plotNo + ","}{" "}
					{data.dev?.address && data.dev?.address?.toLowerCase()}
				</span>
				<span>{data.dev?.type}</span>
				<span>{data.rep?.phone && data.rep?.phone !== "" ? "yes" : "no"}</span>

				{type === "current" ? (
					<span>{data?.stack || "Not Stacked"}</span>
				) : (
					<span>{data?.dev?.zone}</span>
				)}

				<div className="tags">
					{data?.isFastTrack && <div className="fast_track">ftr</div>}
					{data?.isFileOfInterest && (
						<div className="file_of_interest">foi</div>
					)}
					{data?.isOldFile && <div className="old_file">old</div>}
				</div>
			</div>
		</>
	);
}

export default ListCard;
