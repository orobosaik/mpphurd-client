import { EditRounded } from "@mui/icons-material";
import "./planInfo.css";
import { Link, useNavigate } from "react-router-dom";
import PlanInfoCard from "../planInfoCard/PlanInfoCard";
import ViewBill from "../planBill/PlanBill";
import PlanEditInfoModal from "../planEditInfoModal/PlanEditInfoModal";
import AddCommentModal from "../addCommentModal/AddCommentModal";
import ConfirmationModal from "../confirmationModal/ConfirmationModal";
import { useSelector } from "react-redux";

export default function PlanInfo({ setTopBarData, setViewBills, data }) {
	const navigate = useNavigate();
	const { currentUser, loading } = useSelector((state) => state.user);
	const generatePlanNumber = () => {
		alert("YAYYY");
	};

	// Check if Plan is in User Office(s)
	const isInUserOffice = currentUser.office.some((e) => {
		return data.currentOffice.id._id.toString() === e.id._id.toString();
	});

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
						<span className="planInfoSummaryTitle">Current Office:</span>
						<span className="planInfoSummaryText">
							<span className="planInfoSummaryStack">
								{data.currentOffice.id.name} Office
							</span>
							.
						</span>
					</div>

					{isInUserOffice && (
						<div className="planInfoSummaryItem">
							<span className="planInfoSummaryTitle">Current Stack:</span>
							<span className="planInfoSummaryText">
								<span className="planInfoSummaryStack">Stack A7</span>.
							</span>
						</div>
					)}

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

				<div className="planInfoSummaryDetails2">
					{isInUserOffice && (
						<>
							<PlanEditInfoModal state={data} />
						</>
					)}

					{
						// Check if User has authorization to generate plan number
						currentUser.office.some((e) => {
							return (
								data.currentOffice.id._id.toString() === e.id._id.toString() &&
								e.tasks.includes("GENERATE PLAN NUMBER")
							);
						}) &&
							!data.planNumber && (
								<ConfirmationModal
									headerText={`${data.uniqueId} - ${data.dev.use}`}
									buttonText={"Generate PN"}
									title={"Generate Plan Number"}
									body={
										"Clicking Okay will generate the next plan number available. Please ensure all criteria are met."
									}
									onSubmitFunction={generatePlanNumber}
								/>
							)
					}
				</div>
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
				{
					// Check if User has authorization to create bill
					currentUser.office.some((e) => {
						return (
							data.currentOffice.id._id.toString() === e.id._id.toString() &&
							e.tasks.includes("CREATE BILL")
						);
					}) && (
						<>
							<Link to="./create_bill">
								<button className="primary">Generate Bill</button>
							</Link>
						</>
					)
				}

				<Link to="./bills">
					<button className="secondary">View Bills</button>
				</Link>

				{
					// Check if User has authorization to comment on plan
					currentUser.office.some((e) => {
						return (
							data.currentOffice.id._id.toString() === e.id._id.toString() &&
							e.tasks.includes("COMMENT PLAN")
						);
					}) && (
						<>
							<AddCommentModal data={data} />
						</>
					)
				}

				{
					// Check if User has authorization to minute plan
					currentUser.office.some((e) => {
						return (
							data.currentOffice.id._id.toString() === e.id._id.toString() &&
							e.tasks.includes("MINUTE PLAN")
						);
					}) && (
						<>
							<div
								onClick={() => {
									navigate("./minute", { state: data });
								}}>
								<button className="secondary">Minute Plan</button>
							</div>
							<AddCommentModal data={data} />
						</>
					)
				}
			</div>
		</div>
	);
}
