// Filename: ToggleSwitch.js
import { useState } from "react";
import "./toggleSwitch.css";

export default function ToggleSwitch({ label, toggled, onClick }) {
	const [isToggled, setIsToggled] = useState(toggled);
	const handleClick = () => {
		setIsToggled(!isToggled);
		onClick(!isToggled);
	};
	return (
		<div className="container">
			{/* <div className="toggle-switch">
				<input
					type="checkbox"
					className="checkbox"
					name={label}
					id={label}
					defaultChecked={isToggled}
					onClick={handleClick}
				/>
				<label className="label" htmlFor={label}>
					<span className="inner" />
					<span className="switch" />
				</label>
			</div> */}

			<span>{label}</span>
			<label className="toggle-switch">
				<input
					type="checkbox"
					defaultChecked={isToggled}
					onClick={handleClick}
				/>
				<span />
				{/* <strong>{label}</strong> */}
			</label>
		</div>
	);
}
