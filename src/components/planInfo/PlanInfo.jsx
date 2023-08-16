import { EditRounded } from "@mui/icons-material";
import "./planInfo.css";
import PlanInfoCard from "../planInfoCard/PlanInfoCard";
import ViewBill from "../planBill/PlanBill";

export default function PlanInfo({ setTopBarData, setViewBills }) {
	return (
		<div className="planInfo">
			<div className="planInfoSummary">
				<div className="planInfoSummaryDetails">
					<div className="planInfoSummaryName">
						<span className="planInfoSummaryTitle">File Name</span>
						<span className="planInfoSummaryText">Abel Igbinedion</span>
					</div>
					<div className="planInfoSummaryLocation">
						<span className="planInfoSummaryTitle">Site Location</span>
						<span className="planInfoSummaryText">
							Plot 4, Amagba cresent off Sapele Road, Benin city Crescent by
							Mobil Oil.
						</span>
					</div>
				</div>
				{/* <button className="planInfoSummaryEdit">
					<EditRounded className="editIcon" />
					Edit
				</button> */}
			</div>

			<div className="planInfoWrapper">
				<PlanInfoCard BD={true} />
				<PlanInfoCard />
				<PlanInfoCard />
				<PlanInfoCard BD={true} />
				<PlanInfoCard />
			</div>
			<div className="planInfoButtons">
				<button
					className="primary"
					onClick={() => setViewBills("generateBill")}>
					Generate Bill
				</button>
				<button className="secondary" onClick={() => setViewBills("viewBills")}>
					View Bills
				</button>
			</div>
		</div>
	);
}
