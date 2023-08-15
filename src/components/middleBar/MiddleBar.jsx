import "./middleBar.css";
import TopBar from "../topBar/TopBar";
import FeedCard from "../feedCard/FeedCard";
import { useState } from "react";
import PlanInfo from "../planInfo/PlanInfo";

export default function MiddleBar({ topBarData, children }) {
	const [scroll, setScroll] = useState(false);
	return (
		<div className="middleBar">
			<TopBar topBarData={topBarData}
				style={{
					boxShadow:
						scroll > 0 ? "inset 0 8px 5px -5px rgb(0 0 0 / 0.4)" : "none",
					border: "1px solid #ccc",
				}}
			/>
			<div
				className="middleBarWrapper"
				onScroll={(e) => {
					const current = e.target.scrollTop;
					current > 0 ? setScroll(true) : setScroll(false);
				}}>



				<div>{children}</div>
			</div>
		</div>
	);
}
