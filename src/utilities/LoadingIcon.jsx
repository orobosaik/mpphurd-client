import { CircularProgress } from "@mui/material";
import React from "react";

function LoadingIcon({thickness, size, className}) {
	return (
		<div className="loading-container">
			<CircularProgress thickness={thickness || 3} size={size || 55} className={className || "loading-icon"} />
		</div>
	);
}

export default LoadingIcon;
