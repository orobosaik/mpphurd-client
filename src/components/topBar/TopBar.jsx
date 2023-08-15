import { ArrowBackRounded } from "@mui/icons-material"
import "./topBar.css"

export default function TopBar({topBarData}) {
  return (
    <div className="topBar">

      <ArrowBackRounded className="topBarArrowIcon" />
      <div className="topBarAction">
        <span className="topBarName">{topBarData}</span>
        <span className="topBarPlanNumber"> - MPPHURD/BC/1343/2023</span>
      </div>

    </div>
  )
}
