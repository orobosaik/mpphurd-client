import { EditRounded } from "@mui/icons-material";
import "./planInfo.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PlanInfoCard from "../planInfoCard/PlanInfoCard";
import ViewBill from "../planBill/PlanBill";
import PlanEditInfoModal from "../planEditInfoModal/PlanEditInfoModal";
import AddCommentModal from "../addCommentModal/AddCommentModal";
import ConfirmationModal from "../confirmationModal/ConfirmationModal";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import { getThemeColor } from "../../utilities/themeColor";
import GeneratePlanNoModal from "../generatePlanNoModal/GeneratePlanNoModal";

function PlanInfo({ setTopBarData, setViewBills, state, reload }) {
	const navigate = useNavigate();
	const [data, setData] = useState(state);
	const { currentUser, loading } = useSelector((state) => state.user);
	const themeColor = getThemeColor();

	// Check if Plan is in User Office(s)
	const isInUserOffice = currentUser.office.some((e) => {
		return data.currentOffice.id._id === e.id._id;
	});
	// Check if User is a management staff
	const isManagementStaff = currentUser.isManagement;

	useEffect(() => {
		setData(state);
	}, [state]);

	return (
		<div className="planInfo">
			<div
				className={
					data.approval.status === "approved"
						? "watermark approved"
						: data.approval.status === "kiv"
						? "watermark kiv"
						: data.approval.status === "rejected"
						? "watermark rejected"
						: "watermark processing"
				}>
				<span>
					{data.approval.status === "approved"
						? "APPROVED"
						: data.approval.status === "kiv"
						? "KIV"
						: data.approval.status === "rejected"
						? "REJECTED"
						: ""}
				</span>
			</div>
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
							{`${data.dev.plotNo}, ${data.dev.address}`}
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
								<span className="planInfoSummaryStack">{data.stack}</span>.
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
							<PlanEditInfoModal reload={reload} state={data} />
						</>
					)}

					{
						// Check if User has authorization to generate plan number
						currentUser.office.some((e) => {
							return (
								data.currentOffice.id._id === e.id._id &&
								e.tasks.includes("GENERATE PLAN NUMBER")
							);
						}) &&
							!data.planNumber && (
								<GeneratePlanNoModal
									headerText={`${data.uniqueId} - ${data.dev.use}`}
									buttonText={"Generate PN"}
									title={"Generate Plan Number"}
									body={
										"Clicking Okay will generate the next plan number available. Please ensure all criteria are met."
									}
									reload={reload}
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
							data.currentOffice.id._id === e.id._id &&
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

				{(isInUserOffice || isManagementStaff) && (
					<Link to="./bills">
						<button className="secondary">View Bills</button>
					</Link>
				)}

				{
					// Check if User has authorization to comment on plan
					currentUser.office.some((e) => {
						return (
							data.currentOffice.id._id === e.id._id &&
							e.tasks.includes("COMMENT ON PLAN")
						);
					}) && (
						<>
							<AddCommentModal data={data} reload={reload} />
						</>
					)
				}

				{
					// Check if User has authorization to minute plan
					currentUser.office.some((e) => {
						return (
							data.currentOffice.id._id === e.id._id &&
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
							{/* <AddCommentModal data={data} /> */}
						</>
					)
				}
			</div>
			<ToastContainer />
		</div>
	);
}
export default PlanInfo;
