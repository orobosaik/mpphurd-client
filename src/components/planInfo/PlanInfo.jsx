import { EditRounded } from "@mui/icons-material";
import "./planInfo.css";
import { Link } from "react-router-dom";
import PlanInfoCard from "../planInfoCard/PlanInfoCard";
import ViewBill from "../planBill/PlanBill";
import PlanEditInfoModal from "../planEditInfoModal/PlanEditInfoModal";

export default function PlanInfo({ setTopBarData, setViewBills }) {

	return (
		<div className="planInfo">
			<div className="planInfoSummary">
				<div className="planInfoSummaryDetails">
					<div className="planInfoSummaryItem">
						<span className="planInfoSummaryTitle">File Name:</span>
						<span className="planInfoSummaryText">Abel Igbinedion</span>
					</div>
					<div className="planInfoSummaryItem">
						<span className="planInfoSummaryTitle">Site Location:</span>
						<span className="planInfoSummaryText">
							Plot 4, Amagba cresent off Sapele Road, Benin city Crescent by
							Mobil Oil.
						</span>
					</div>
					<div className="planInfoSummaryItem">
						<span className="planInfoSummaryTitle">Current Stack:</span>
						<span className="planInfoSummaryText">
							<span className="planInfoSummaryStack">Stack A7</span>.
						</span>
					</div>
					<div className="planInfoSummaryItem">
						<span className="planInfoSummaryTitle">Tags:</span>
						<span className="planInfoSummaryText">
							<span className="tag tag-fastTrack">Fast Track</span>
							<span className="tag tag-oldFile">Old File</span>
							<span className="tag tag-fileOfInterest">File Of Interest</span>
						</span>
					</div>
				</div>

				<PlanEditInfoModal />
			</div>

			<div className="planInfoWrapper">
				<PlanInfoCard
					type={"company"}
					title={"Applicant Information"}
					BD={true}
				/>
				<PlanInfoCard
					type={"individual"}
					title={"Representative Information"}
					BD={true}
				/>
				<PlanInfoCard type={"building"} title={"Building Details"} />
			</div>
			<div className="planInfoButtons">
				<Link to="./createbill">
					<button className="primary">Generate Bill</button>
				</Link>
				<Link to="./bills">
					<button className="secondary">View Bills</button>
				</Link>
				<Link to="./minute">
					<button className="secondary">Minute Plan</button>
				</Link>
			</div>
		</div>
	);
}
