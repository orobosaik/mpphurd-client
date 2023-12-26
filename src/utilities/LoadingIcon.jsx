import { CircularProgress } from "@mui/material";
import React from "react";

function loadingIcon() {
	return (
		<div className="loading-container">
			<CircularProgress thickness={3} size={55} className="loading-icon" />
		</div>
	);
}

export default loadingIcon;
