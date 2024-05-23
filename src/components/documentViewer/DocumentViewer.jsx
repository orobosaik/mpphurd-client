import {
  ArrowCircleUpRounded,
  ArrowDownwardRounded,
  ArrowUpwardRounded,
  MoveUpRounded,
	NavigateBeforeRounded,
	NavigateNextRounded,
	NextPlanRounded,
	PlusOneRounded,
	SkipNextRounded,
	ViewModuleRounded,
	ZoomInRounded,
	ZoomOutMap,
	ZoomOutMapRounded,
	ZoomOutRounded,
  ZoomOutTwoTone,
} from "@mui/icons-material";
import "./documentViewer.css";

export default function DocumentViewer() {
	return (
		<div className="documentViewerContainer">
			<div className="documentViewerTopControl secondary">
				<ViewModuleRounded className="documentViewerIcon" />
				<ZoomInRounded className="documentViewerIcon" />
				<ZoomOutRounded className="documentViewerIcon" />
				<ArrowUpwardRounded className="documentViewerIcon" />
				<ArrowDownwardRounded className="documentViewerIcon" />
			</div>
			<span>DocumentViewer</span>

			<div className="documentViewerBottomControl">
				<div className="secondary">Page <input type="number" name="" id="" min="1"/> of 45</div>
				<button className="secondary">Comment</button>
			</div>
		</div>
	);
}
