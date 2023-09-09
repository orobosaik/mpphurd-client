import axios from "axios";
import { useRef, useState } from "react";
import "./loginPage.css";
import { useDispatch, useSelector } from "react-redux";

import {
	Facebook,
	Instagram,
	LockOutlined,
	MailOutlineRounded,
	Twitter,
	VisibilityOffOutlined,
	VisibilityOutlined,
} from "@mui/icons-material";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import { CircularProgress } from "@mui/material";

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const { currentUser, loading } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const email = useRef();
	const password = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(email, password);

		dispatch(loginStart());

		try {
			const res = await axios.post("/staffs/auth/login", {
				email: email.current.value,
				password: password.current.value,
			});
			dispatch(loginSuccess(res.data));
		} catch (error) {
			console.log(error);
			dispatch(loginFailure());
		}
	};

	return (
		<>
			<div className="login">
				<div className="login__background"></div>
				<section className="login__header">
					<div className="login__formBackground">
						<section className="app-cover__info">
							<h1>M-FLOW</h1>
							<h2>
								ministry of physical planning, housing, urban and regional
								development app
							</h2>
							<p>
								An Application to automate the internal{" "}
								<span className="app-cover__info--highlight">
									Work Flows <span className="app-cover__info--svg" />
								</span>
								of the Ministry
							</p>
						</section>

						<form action="#" className="login__form" onSubmit={handleSubmit}>
							<div className="form-logo">
								{/* <img src="Mpphurd.png" alt="Mpphurd Logo" /> */}
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
							<p className="btn password-reset">Forgot Password</p>
							<button
								type="submit"
								className="btn btn-form-submit"
								disabled={loading}>
								{loading ? (
									<CircularProgress
										thickness={5}
										size={25}
										sx={{ color: "white" }}
									/>
								) : (
									"Login"
								)}
							</button>
						</form>
					</div>
				</section>
				<footer className="login__footer">
					<div className="login__footer--copyright">
						© 2023 Copyright MPPHURD
					</div>
					<div className="login__footer--mda">
						<div className="login__footer--logos">
							<div className="login__footer--logo">
								<img
									src="/assets/logos/Logo-Edo State.png"
									alt="Edo State Logo"
								/>
							</div>
							<div className="login__footer--logo">
								<img src="/assets/logos/Logo-Mpphurd.png" alt="MPPHURD Logo" />
							</div>
						</div>
						<div className="login__footer--text">
							EDO STATE MINISTRY OF PHYSICAL PLANNING, HOUSING, URBAN AND
							REGIONAL DEVELOPMENT
						</div>
					</div>
					<div className="login__footer--social">
						<div className="login__socialIcons">
							<Facebook className="btn login__socialIcon" />
							<Instagram className="btn login__socialIcon" />
							<Twitter className="btn login__socialIcon" />
						</div>
						<div className="login__socialText">
							<p>Follow On Social Media</p>
						</div>
					</div>
				</footer>
			</div>
		</>
	);
}
