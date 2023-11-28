import "./changePasswordModal.css";
import axios from "axios";
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
import { ToastContainer, toast } from "react-toastify";
import { getThemeColor } from "../../utilities/themeColor";

export default function ChangePasswordModal({ ...props }) {
	const [open, setOpen] = useState(false);
	const [reset, setReset] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [passwordErr, setPasswordErr] = useState("");
	const [loading, setLoading] = useState(false);

	const [emailUpdate, setEmailUpdate] = useState("");
	const [passwordUpdate1, setPasswordUpdate1] = useState("");
	const [passwordUpdate2, setPasswordUpdate2] = useState("");
	const [otpCode, setOtpCode] = useState("");

	console.log(emailUpdate);
	console.log(passwordUpdate1);
	console.log(passwordUpdate2);

	const themeColor = getThemeColor();

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setReset(true);
		setOpen(false);
	};
	const handleSubmit = () => setOpen(null);

	const handleStartReset = (e) => {
		console.log("In Handle Start Reset");
		setLoading(true);

		if (
			emailUpdate === "" ||
			passwordUpdate1 === "" ||
			passwordUpdate1 !== passwordUpdate2
		) {
			setPasswordErr("Passwords do not match");
			setLoading(false);
			return;
		}

		const resetPassword = async (email, password, otp) => {
			try {
				let host = import.meta.env.VITE_SERVER;
				const res = await axios.post(`${host}/staffs/auth/change-password`, {
					email: email,
					password: password,
					otp: otp,
				});
				setLoading(false);
				setReset(true);
				setOpen(false);


				setTimeout(() => {
					toast.success(res.data, {
						position: "top-right",
						autoClose: 1000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: themeColor,
					});
				}, 0);
			} catch (error) {
				let message = error.response
					? error.response.data.message
					: error.message;

				toast.error(message, {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: themeColor,
				});

				setLoading(false);
			}
		};
		const sendOTPCode = async (email) => {
			try {
				let host = import.meta.env.VITE_SERVER;
				const res = await axios.post(`${host}/staffs/staff/send-otp`, {
					email: email,
				});
				setLoading(false);
				setReset(false);
			} catch (error) {
				setLoading(false);

				let message = error.response
					? error.response.data.message
					: error.message;

				toast.error(message, {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: themeColor,
				});
			}
		};

		if (reset) {
			sendOTPCode(emailUpdate);
		} else if (!reset) {
			resetPassword(emailUpdate, passwordUpdate1, otpCode);
		}
		// setReset(() => !reset);

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

					<div className="">
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

									<div className="form-input otp-code">
										<label htmlFor="email">Enter OTP Code</label>
										<div>
											<input
												type="otpCode"
												name="otpCode"
												id="otpCode"
												required
												// ref={otpCode}
												onChange={(e) => setOtpCode(e.target.value)}
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
												// ref={emailUpdate}
												onChange={(e) => setEmailUpdate(e.target.value)}
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
												// ref={passwordUpdate1}
												onChange={(e) => {
													setPasswordUpdate1(e.target.value);
													setPasswordErr("");
												}}
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
												// ref={passwordUpdate2}

												onChange={(e) => {
													setPasswordUpdate2(e.target.value);
													setPasswordErr("");
												}}
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
										size={20}
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
					</div>
				</dialog>
			)}
		</div>
	);
}
