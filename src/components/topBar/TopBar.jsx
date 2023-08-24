import {
	ArrowBackRounded,
	DashboardRounded,
	HorizontalRuleRounded,
	RuleRounded,
	SafetyDividerRounded,
} from "@mui/icons-material";
import "./topBar.css";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TopBar({ action, planNumber }) {
	const navigate = useNavigate();
	return (
		<div className="topBar">
			<ArrowBackRounded
				className="topBarArrowIcon"
				onClick={() => navigate(-1)}
			/>
			<div className="topBarAction">
				<span className="topBarName">{action}</span>
				{planNumber && (
					<span className="topBarDivider">
						<HorizontalRuleRounded />
					</span>
				)}
				{planNumber && <span className="topBarPlanNumber">{planNumber}</span>}
			</div>
		</div>
	);
}
