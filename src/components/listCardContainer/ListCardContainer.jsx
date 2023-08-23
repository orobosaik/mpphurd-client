import { useState } from "react";
import "./listCardContainer.css";
import { ExpandLessRounded, Height } from "@mui/icons-material";

export default function ListCardContainer({ date, count, children }) {
	const [expanded, setExpanded] = useState(true);
	return (
		<div className="listCardContainer">
			<div
				className="listCardContainerTop"
				onClick={() => setExpanded(!expanded)}>
				<div className="listCardContainerCount">
					<span>{date}</span>
					<span>{count}</span>
				</div>
				<ExpandLessRounded />
			</div>
			<div
				className={
					expanded
						? "listCardContainerCards "
						: "listCardContainerCards collapsed"
				}>
				{children}
			</div>
		</div>
	);
}
