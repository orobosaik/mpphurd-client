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
			<span>{data?.planNumber?.value || data.uniqueId}</span>
			<span>
				{data.applicant.name} ({data.dev.name})
			</span>
			<span>
				{data.dev.plotNo} {data.dev.address}
			</span>
			<span>{data.dev.use}</span>
		</div>
	);
}
