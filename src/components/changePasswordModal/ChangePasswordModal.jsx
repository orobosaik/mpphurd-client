import "./changePasswordModal.css";
import {
	LockOutlined,
	MailOutlineRounded,
	VisibilityOffOutlined,
	VisibilityOutlined,
} from "@mui/icons-material";
import ToggleSwitch from "../toggleSwitch/ToggleSwitch";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CloseRounded, EditRounded } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { ToastContainer } from "react-toastify";

export default function ChangePasswordModal({ ...props }) {
	const [open, setOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

			const email = useRef();
			const password = useRef();


	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleSubmit = () => setOpen(null);

	const KEY_NAME_ESC = "Escape";
	const KEY_EVENT_TYPE = "keyup";

	useEscapeKey(handleClose);

	function useEscapeKey(handleClose) {
		const handleEscKey = useCallback(
			(event) => {
				if (event.key === KEY_NAME_ESC) {
					handleClose();
				}
			},
			[handleClose]
		);

		useEffect(() => {
			document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

			return () => {
				document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
			};
		}, [handleEscKey]);
	}

	useEffect(() => {
		const modal = document.querySelector(".changePasswordModal");
		if (modal) {
			open ? modal.showModal() : modal.close();
		}
		return () => {};
	}, [open]);



	return (
		<>
			<p className={props.class} onClick={handleOpen}>
				{props.name}
			</p>

			{open && (
				<dialog className="modalView changePasswordModal ">
					<header>
						<span>Change Password</span>

						<div className="modalViewCloseButton" onClick={handleClose}>
							<CloseRounded className="closeButton" />
						</div>
							{/* <img src="Mpphurd.png" alt="Mpphurd Logo" /> */}
					</header>

					 <form action="#" className=" login__form" onSubmit={handleSubmit}>
						<div className="form-logo">
						</div>
						<p className="form-greeting"> Please Login to continue</p>
						<div className="form-input">
							<label htmlFor="email">Email</label>
							<div>
								<span>
									<MailOutlineRounded className="formIcon" />
								</span>
								<input
									type="email"
									name="email"
									id="email"
									placeholder="Enter your email address"
									required
									ref={email}
								/>
							</div>
						</div>
						<div className="form-input">
							<label htmlFor="password">Password</label>
							<div>
								<span>
									<LockOutlined className="formIcon" />
								</span>
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									id="password"
									placeholder="Enter your password"
									required
									ref={password}
								/>
								<span
									className="btn"
									onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? (
										<VisibilityOutlined className="formIcon" />
									) : (
										<VisibilityOffOutlined className="formIcon" />
									)}
								</span>
							</div>
						</div>
						<div className="form-input">
							<label htmlFor="password">Confirm Password</label>
							<div>
								<span>
									<LockOutlined className="formIcon" />
								</span>
								<input
									type={showPassword ? "text" : "password"}
									name="password2"
									id="password2"
									placeholder="Confirm your new password"
									required
									ref={password}
								/>
								<span
									className="btn"
									onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? (
										<VisibilityOutlined className="formIcon" />
									) : (
										<VisibilityOffOutlined className="formIcon" />
									)}
								</span>
							</div>
						</div>

						<ToastContainer />

						<footer>
						<button
							type="submit"
							className="btn primary"
							// className="btn btn-form-submit"
							disabled={loading}>
							{loading ? (
								<CircularProgress
									thickness={5}
									size={25}
									sx={{ color: "white" }}
								/>
							) : (
								"Continue"
							)}
						</button>
						</footer>
					</form>

				</dialog>
			)}
		</>
	);
}
