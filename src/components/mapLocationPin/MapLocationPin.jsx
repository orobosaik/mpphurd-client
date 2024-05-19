import { useState } from "react";
import "./mapLocationPin.css";
import {
	ExpandLessRounded,
	ExpandMoreRounded,
	LaunchRounded,
	LocationOn,
} from "@mui/icons-material";
import AddCommentModal from "../addCommentModal/AddCommentModal";


export default function MapLocationPin({ text }) {
	const [showComment, setShowComment] = useState(false);

	return (
		<div className="pin">
			{/* <Icon icon={locationIcon} className="pin-icon" /> */}
			<LocationOn/>
			<p className="pin-text">{text}</p>
		</div>
	);
}
