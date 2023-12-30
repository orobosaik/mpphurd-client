import { EditRounded } from "@mui/icons-material";
import "./planInfo.css";
import { Link, useNavigate } from "react-router-dom";
import PlanInfoCard from "../planInfoCard/PlanInfoCard";
import ViewBill from "../planBill/PlanBill";
import PlanEditInfoModal from "../planEditInfoModal/PlanEditInfoModal";
import AddCommentModal from "../addCommentModal/AddCommentModal";

export default function PlanInfo({ setTopBarData, setViewBills, data }) {
	const navigate = useNavigate();
	return (
		<div className="planInfo">
			<div className="planInfoSummary">
				<div className="planInfoSummaryDetails">
					<div className="planInfoSummaryItem">
						<span className="planInfoSummaryTitle">File Name:</span>
						<span className="planInfoSummaryText large">
							{data.applicant.name}
							{data.dev.name && ` (${data.dev.name})`}
						</span>
					</div>
					<div className="planInfoSummaryItem">
						<span className="planInfoSummaryTitle">Site Location:</span>
						<span className="planInfoSummaryText large">
							{data.dev.address}
						</span>
					</div>
					<div className="planInfoSummaryItem">
						<span className="planInfoSummaryTitle">Current Stack:</span>
						<span className="planInfoSummaryText">
							<span className="planInfoSummaryStack">Stack A7</span>.
						</span>
					</div>
					<div className="planInfoSummaryItem">
						{(data.isFastTrack || data.isFileOfInterest || data.isOldFile) && (
							<span className="planInfoSummaryTitle">Tags:</span>
						)}
						<span className="planInfoSummaryText">
							{data.isFastTrack && (
								<span className="tag tag-fastTrack">Fast Track</span>
							)}
							{data.isOldFile && (
								<span className="tag tag-oldFile">Old File</span>
							)}
							{data.isFileOfInterest && (
								<span className="tag tag-fileOfInterest">File Of Interest</span>
							)}
						</span>
					</div>
				</div>

				<PlanEditInfoModal />
			</div>

			<div className="planInfoWrapper">
				<PlanInfoCard
					type={data.applicant.type}
					BD={true}
					data={data.applicant}
				/>
				<PlanInfoCard type={"rep"} BD={true} data={data.rep} />
				<PlanInfoCard type={"building"} data={data.dev} />
			</div>

			<div className="planInfoButtons">
				<Link to="./create_bill">
					<button className="primary">Generate Bill</button>
				</Link>
				<Link to="./bills">
					<button className="secondary">View Bills</button>
				</Link>
				<div
					onClick={() => {
						navigate("./minute", { state: data });
					}}>
					<button className="secondary">Minute Plan</button>
				</div>
				<AddCommentModal data={data} />
				<div onClick={() => <AddCommentModal data={data} />}>
					<button className="secondary">Add Comments</button>
				</div>
			</div>
		</div>
	);
}
