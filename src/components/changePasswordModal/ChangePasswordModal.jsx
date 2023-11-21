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
	const [reset, setReset] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [passwordErr, setPasswordErr] = useState("");
	const [loading, setLoading] = useState(false);

	const emailUpdate = useRef();
	const passwordUpdate1 = useRef();
	const passwordUpdate2 = useRef();
	const otpCode = useRef();

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setReset(true);
		setOpen(false);
	};
	const handleSubmit = () => setOpen(null);

	const handleStartReset = (e) => {
		console.log("In Handle Start Reset");

		if (passwordUpdate1.current.value !== passwordUpdate2.current.value) {
			setPasswordErr("Passwords do not match");
			return;
		}
		setReset(() => !reset);

		// e.preventDefault();

		// alert("worked");
		// setReset(true)
	};

	const handleCompleteReset = (e) => {};

	// const KEY_NAME_ESC = "Escape";
	// const KEY_EVENT_TYPE = "keyup";

	useEscapeKey(handleClose, "Escape", "keyup");
	useEscapeKey(handleStartReset, "Enter", "keydown");

	function useEscapeKey(handleClose, KEY_NAME_ESC, KEY_EVENT_TYPE) {
		const handleEventKey = useCallback(
			(event) => {
				if (event.key === KEY_NAME_ESC) {
					handleClose();
				}
			},
			[handleClose]
		);

		useEffect(() => {
			document.addEventListener(KEY_EVENT_TYPE, handleEventKey, false);

			return () => {
				document.removeEventListener(KEY_EVENT_TYPE, handleEventKey, false);
			};
		}, [handleEventKey]);
	}

	useEffect(() => {
		const modal = document.querySelector(".changePasswordModal");
		if (modal) {
			open ? modal.showModal() : modal.close();
		}
		return () => {};
	}, [open]);

	return (
		<div>
			<p className={props.class} onClick={handleOpen}>
				{props.name}
			</p>

			{open && (
				<dialog className="modalView changePasswordModal ">
					{/* {reset && (
						<form className=" login__form" onSubmit={handleCompleteReset}>
							<p className="form-greeting">
								An email containing your OTP Code has been sent. Check your
								email
							</p>

							<div className="form-input">
								<label htmlFor="email">Enter OTP Code</label>
								<div>
									<input
										type="otpCode"
										name="otpCode"
										id="otpCode"
										required
										ref={otpCode}
									/>
								</div>
							</div>

							<ToastContainer />
						</form>
					)} */}

					<form className="">
						<header>
							<span>Change Password</span>
							<div className="modalViewCloseButton" onClick={handleClose}>
								<CloseRounded className="closeButton" />
							</div>
						</header>

						<div className="login__form">
							{!reset ? (
								<>
									<p className="form-greeting">
										An email containing your OTP Code has been sent. Check your
										email
									</p>

									<div className="form-input">
										<label htmlFor="email">Enter OTP Code</label>
										<div>
											<input
												type="otpCode"
												name="otpCode"
												id="otpCode"
												required
												ref={otpCode}
											/>
										</div>
									</div>
								</>
							) : (
								<>
									<p className="">
										Enter your email address and a new and unique password.
										Select continue to receive an email containing an OTP Code.
										Enter the OTP code to successfully change your password.
									</p>
									<div className="form-input">
										<label htmlFor="emailUpdate">Email</label>
										<div>
											<span>
												<MailOutlineRounded className="formIcon" />
											</span>
											<input
												type="email"
												name="emailUpdate"
												id="emailUpdate"
												placeholder="Enter your email address"
												required
												ref={emailUpdate}
											/>
										</div>
									</div>
									<div className="form-input">
										<label htmlFor="passwordUpdate1">New Password</label>
										<div className={passwordErr && "passwordErrorDiv"}>
											<span>
												<LockOutlined className="formIcon" />
											</span>
											<input
												type={showPassword ? "text" : "password"}
												name="passwordUpdate1"
												id="passwordUpdate1"
												placeholder="Enter new password"
												required
												ref={passwordUpdate1}
												onChange={() => setPasswordErr("")}
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
										<label htmlFor="passwordUpdate2">
											Confirm New Password
										</label>
										<div className={passwordErr && "passwordErrorDiv"}>
											<span>
												<LockOutlined className="formIcon" />
											</span>
											<input
												type={showPassword ? "text" : "password"}
												name="passwordUpdate2"
												id="passwordUpdate2"
												placeholder="Confirm new password"
												required
												ref={passwordUpdate2}
												onChange={() => setPasswordErr("")}
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
											{passwordErr && (
												<span className="passwordErrorText">{passwordErr}</span>
											)}
										</div>
									</div>
								</>
							)}
						</div>

						<footer>
							<button
								type="button"
								className="btn primary"
								disabled={loading}
								onClick={handleStartReset}>
								{loading ? (
									<CircularProgress
										thickness={5}
										size={25}
										sx={{ color: "white" }}
									/>
								) : !reset ? (
									"Submit"
								) : (
									"Continue"
								)}
							</button>
						</footer>
						<ToastContainer />
					</form>
				</dialog>
			)}
		</div>
	);
}
