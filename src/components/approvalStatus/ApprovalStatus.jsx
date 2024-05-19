import { CheckCircleRounded, ErrorRounded } from "@mui/icons-material";
import "./approvalStatus.css";
import { format } from "date-fns";
export default function ApprovalStatus({ data }) {
	return (
		<>
			{data?.approval?.status === "approved" ? (
				<div className="plan-watermark approved">
					<CheckCircleRounded className="statusIcon" />
					<div className="wrapper">
						<div className="info">
							<div className="status">APPROVED</div>
							<div className="date">
								{format(data?.approval?.statusDate, "eee, MMM d, yyyy")}
							</div>
						</div>
						{data?.approval?.isCollected && (
							<div className="info">
								<div className="status">Conveyance collected</div>
								<div className="date">
									{format(data?.approval?.isCollectedDate, "eee, MMM d, yyyy")}
								</div>
							</div>
						)}
					</div>
				</div>
			) : data?.approval?.status === "kiv" ? (
				<div className="plan-watermark kiv">
					<ErrorRounded className="statusIcon" />{" "}
					<div className="info">
						<div className="status">KIV</div>
						<div className="date">
							{format(data?.approval?.statusDate, "eee, MMM d, yyyy")}
						</div>
					</div>
				</div>
			) : data?.approval?.status === "rejected" ? (
				<div className="plan-watermark rejected">
					<ErrorRounded className="statusIcon" />{" "}
					<div className="info">
						<div className="status">REJECTED</div>
						<div className="date">
							{format(data?.approval?.statusDate, "eee, MMM d, yyyy")}
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
}
