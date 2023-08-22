import { ArrowBackRounded, DashboardRounded, HorizontalRuleRounded, RuleRounded, SafetyDividerRounded } from "@mui/icons-material"
import "./topBar.css"
import { Divider } from "@mui/material"

export default function TopBar( {action, planNumber} ) {
  return (
    <div className="topBar">

      <ArrowBackRounded className="topBarArrowIcon" />
      <div className="topBarAction">
        <span className="topBarName">{action}</span>
        <span className="topBarDivider"><HorizontalRuleRounded/></span>
        <span className="topBarPlanNumber">{planNumber}</span>
      </div>

    </div>
  )
}
