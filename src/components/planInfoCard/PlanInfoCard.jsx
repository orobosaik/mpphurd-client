import "./planInfoCard.css";
export default function PlanInfoCard({ type, AD2, R, BD, data }) {
	const individual = (title) => {
		return (
			<div className="planInfoCard">
				<div className="planInfoDetails">
					<h2 className="planInfoCardTitle">{title}</h2>
					<div className="planInfoItems">
						<div className="planInfoItem">
							<span className="planInfoTitle">Name:</span>
							<span className="planInfoText">{data.name}</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">Gender:</span>
							<span className="planInfoText">{data.gender}</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">Address:</span>
							<span className="planInfoText">{data.address}</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">Phone:</span>
							<span className="planInfoText">
								{data.phone}
								{data.phone1 && ", " + data.phone1}
							</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">Email:</span>
							<span className="planInfoText">
								{data.email}
								{data.email1 && ", " + data.email1}
							</span>
						</div>
					</div>
				</div>
				{BD && (
					<img
						className="planInfoImg"
						src={data.photo || import.meta.env.VITE_NO_AVATAR}
						alt="Passport"
					/>
				)}
			</div>
		);
	};
	const company = () => {
		return (
			<div className="planInfoCard">
				<div className="planInfoDetails">
					<h2 className="planInfoCardTitle">Company Information</h2>
					<div className="planInfoItems">
						<div className="planInfoItem">
							<span className="planInfoTitle">Name:</span>
							<span className="planInfoText">{data.name}</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">Address:</span>
							<span className="planInfoText">{data.address}</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">Phone:</span>
							<span className="planInfoText">
								{data.phone}
								{data.phone1 && ", " + data.phone1}
							</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">Email:</span>
							<span className="planInfoText">
								{data.email}
								{data.email1 && ", " + data.email1}
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	};
	const building = () => {
		return (
			<div className="planInfoCard">
				<div className="planInfoDetails">
					<h2 className="planInfoCardTitle">Building Details</h2>
					<div className="planInfoItems">
						<div className="planInfoItem">
							<span className="planInfoTitle">Name:</span>
							<span className="planInfoText">{data.name}</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">Location:</span>
							<span className="planInfoText">{`${data.plotNo}, ${data.address}`}</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">LGA:</span>
							<span className="planInfoText">{data.lga}</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">Zone:</span>
							<span className="planInfoText">{data.zone}</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">No of Floor:</span>
							<span className="planInfoText">{data.noOfFloors}</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">Building Type:</span>
							<span className="planInfoText">{data.type}</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">Use:</span>
							<span className="planInfoText">{data.use}</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">Assessment:</span>
							<span className="planInfoText">
								{Intl.NumberFormat("en-NG", {
									style: "currency",
									currency: "NGN",
								}).format(data.assessedAmount || 0)}
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			{type === "individual"
				? individual("Applicant Details")
				: type === "rep"
				? individual("Representative Details")
				: type === "company"
				? company("Organization Details")
				: type === "building"
				? building("Building Details")
				: ""}
		</>
	);
}
