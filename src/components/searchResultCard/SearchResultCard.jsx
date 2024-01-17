import { useNavigate } from "react-router-dom";
import "./searchResultCard.css";
import React from "react";

export default function searchResultCard({ data, changeOpen }) {
	const navigate = useNavigate();
	return (
		<div
			className="searchResultCard"
			onClick={() => {
				changeOpen(false);
				navigate(`/permit/${data?._id}`, { state: data });
			}}>
			<span>{data?.planNumber?.fullValue || data?.uniqueId}</span>
			<span>
				{data.applicant?.name?.toLowerCase()}
				{data.dev?.name && ` (${data.dev?.name?.toLowerCase()})`}
			</span>
			<span>
				{data.dev?.plotNo && data.dev?.plotNo + ","}{" "}
				{data.dev?.address && data.dev?.address?.toLowerCase()}
			</span>
			<span>{data.dev?.type}</span>
		</div>
	);
}
