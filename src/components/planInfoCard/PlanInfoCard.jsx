import "./planInfoCard.css";
export default function PlanInfoCard({ AD, AD2, R, BD }) {
	return (
		<div className="planInfoCard">
			<div className="planInfoDetails">
				<h2 className="planInfoCardTitle">Applicants Details</h2>
				<div className="planInfoItems">
					<div className="planInfoItem">
						<span className="planInfoTitle">Name:</span>
						<span className="planInfoText">Chief Orobosa Ikponmwosa</span>
					</div>
					<div className="planInfoItem">
						<span className="planInfoTitle">Phone:</span>
						<span className="planInfoText">0908438954</span>
					</div>
					<div className="planInfoItem">
						<span className="planInfoTitle">Address:</span>
						<span className="planInfoText">
							20 Erie Street off sokponba road, Benin city.
						</span>
					</div>
				</div>
			</div>
      {BD && <img src="/assets/persons/headshot4.jpg" alt="" className="planInfoImg" />}
		</div>
	);
}
