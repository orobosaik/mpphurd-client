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
						src="/assets/persons/no_avatar.png"
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
							<span className="planInfoText">
								Chief Orobosa Ikponmwosa Consultancy firm
							</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">Address:</span>
							<span className="planInfoText">
								20 Igun Street off sokponba road, Benin city. off Edo State,
								Nigeria, Africa Azis
							</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">Phone:</span>
							<span className="planInfoText">0908438954</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">Email:</span>
							<span className="planInfoText">applicant@email.com</span>
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
							<span className="planInfoText">Chief Orobosa Hotel</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">Location:</span>
							<span className="planInfoText">
								20 Igun Street off sokponba road, Benin city. Nigeria Axis
							</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">No of Floor:</span>
							<span className="planInfoText">8</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">Building Type:</span>
							<span className="planInfoText">Commercial</span>
						</div>
						<div className="planInfoItem">
							<span className="planInfoTitle">Purpose:</span>
							<span className="planInfoText">Hotel</span>
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
