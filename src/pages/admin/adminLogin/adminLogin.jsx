import axios from "axios";
import { useRef, useState } from "react";
import "./adminLogin.css";
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
import {
	adminLoginFailure,
	adminLoginStart,
	adminLoginSuccess,
} from "../../../redux/adminSlice";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getThemeColor } from "../../../utilities/themeColor";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../../../widgets/animatedBackground/AnimatedBackground";

function AdminLogin() {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { currentAdmin, loading } = useSelector((state) => state.admin);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { theme } = useSelector((state) => state.app);
	const themeColor = getThemeColor(theme);

	const email = useRef();
	const password = useRef();

	// SET AXIOS CONNECTION TIMEOUT
	const timeoutDuration = import.meta.env.VITE_TIMEOUT;
	axios.interceptors.request.use((config) => {
		config.timeout = timeoutDuration; // Wait for timeout duration in seconds before timing out
		config.signal = AbortSignal.timeout(timeoutDuration); // Wait for timeout duration in seconds before timing out
		return config;
	});
	axios.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.code === "ECONNABORTED" || error.code === "ERR_CANCELED") {
				error.message = "Request timed out";
			}
			return Promise.reject(error);
		}
	);
	axios.defaults.withCredentials = true;

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(adminLoginStart());

		try {
			setIsLoading(true);
			let host = import.meta.env.VITE_SERVER;
			const res = await axios.post(`${host}/staffs/auth/admin_login`, {
				email: email.current.value,
				password: password.current.value,
			});
			// console.log(res.data);
			dispatch(adminLoginSuccess(res.data));
			navigate("/");

			setTimeout(() => {
				toast.success("Login Successful", {});
			}, 200);
		} catch (error) {
			let message = error.response
				? error.response.data.message
				: error.message;
			// console.log(error);
			// console.log(message);

			toast.error(message, {});

			dispatch(adminLoginFailure());
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className="login">
				{/* <div className="login__background"></div> */}
				<AnimatedBackground />
				<section className="login__header">
					<div className="login__formBackground">
						<section className="app-cover__info">
							<div className="app-cover__info-top">
								<div className="app-cover__info__logo">
									<img
										src="/assets/logos/Logo-Mpphurd.png"
										alt="MPPHURD Logo"
									/>
								</div>
								<h1>M-FLOW / ADMIN</h1>
							</div>
							<h2>
								ministry of physical planning, housing, urban and regional
								development app
							</h2>
							<p>
								For a simplified, efficient and automated <br />
								<span className="app-cover__info--highlight">
									Workflow <span className="app-cover__info--svg" />
								</span>
								of the Ministry
							</p>
						</section>

						<form action="#" className="login__form" onSubmit={handleSubmit}>
							<div className="form-logo">
								{/* <img src="Mpphurd.png" alt="Mpphurd Logo" /> */}
							</div>
							<p className="form-greeting">Login to continue as Admin</p>
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
							{/* <p className="btn password-reset">Forgot Password</p> */}
							<p></p>
							<button
								type="submit"
								className="btn btn-form-submit"
								disabled={isLoading}>
								Login Admin
								{isLoading && (
									<CircularProgress
										thickness={6}
										size={22}
										sx={{ color: "white" }}
									/>
								)}
							</button>
						</form>
					</div>
				</section>
				<footer className="login__footer">
					<div className="login__footer--copyright">
						<div>© {new Date().getFullYear()} Copyright MPPHURD</div>
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
export default AdminLogin;
