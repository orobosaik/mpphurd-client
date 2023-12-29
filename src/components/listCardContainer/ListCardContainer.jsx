import { useEffect, useState } from "react";
import "./listCardContainer.css";
import {
	ExpandLessRounded,
	ExpandMoreRounded,
	Height,
} from "@mui/icons-material";

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
				{expanded ? <ExpandLessRounded /> : <ExpandMoreRounded />}
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
