import { useDispatch, useSelector } from "react-redux";
import FeedBackground from "../../components/feedBackground/FeedBackground";
import FeedCard from "../../components/feedCard/FeedCard";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { loginFailure, loginSuccess, logout } from "../../redux/userSlice";
import CreateApplication from "../createApplication/CreateApplication";
import "./home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { resetOfficeData } from "../../redux/appSlice";
import { ToastContainer, toast } from "react-toastify";
import { getThemeColor } from "../../utilities/themeColor";

const events = [
	"load",
	"mousemove",
	"mousedown",
	"click",
	"scroll",
	"keypress",
];

export default function Home() {
	const { currentUser, loading } = useSelector((state) => state.user);
	const themeColor = getThemeColor();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	const [reload, setReload] = useState();
	const [err, setErr] = useState(false);

	const [isLogout, setIsLogout] = useState(0);

	// // Check if Plan is in User Office(s)
	// const isInUserOffice = currentUser.office.some((e) => {
	// 	return data.currentOffice.id._id === e.id._id;
	// });
	// Check if Plan is in User Office(s)
	const isInUserOffice = currentUser.office.some((e) => {
		return e.id.name.includes("ASSESSMENT");
	});

	const [assessment, setAssessment] = useState(
		currentUser.office.some((e) => {
			return e.id.name.includes("ASSESSMENT");
		})
	);
	const [clearing, setClearing] = useState(
		currentUser.office.some((e) => {
			return e.id.name.includes("CLEARING HOUSE");
		})
	);
	const [archive, setArchive] = useState(
		currentUser.office.some((e) => {
			return e.id.name.includes("ARCHIVE");
		})
	);

	// AUTO LOGOUT FUNCTION
	// const events = [
	// 	"load",
	// 	"mousemove",
	// 	"mousedown",
	// 	"click",
	// 	"scroll",
	// 	"keypress",
	// ];

	let logoutCount = 0;
	let timer;

	// this resets the timer if it exists.
	const resetTimer = () => {
		if (timer) clearTimeout(timer);
	};

	useEffect(() => {
		if (currentUser) {
			Object.values(events).forEach((item) => {
				window.addEventListener(item, () => {
					resetTimer();
					handleLogoutTimer();
				});
			});

			return () => {
				resetTimer();
				// Listener clean up. Removes the existing event listener from the window
				Object.values(events).forEach((item) => {
					window.removeEventListener(item, resetTimer);
				});
			};
		}
	});

	// this function sets the timer that logs out the user after 10 secs
	const handleLogoutTimer = () => {
		if (currentUser) {
			// Add this check to ensure the user is still authenticated
			timer = setTimeout(() => {
				// clears any pending timer.
				resetTimer();
				console.log("INSIDE TIMER");

				// logs out user
				// logoutAction();

				if (logoutCount === 0) {
					toast.error("Session Timeout", {
						position: "top-right",
						autoClose: 2500,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: themeColor,
					});
				}

				// Listener clean up. Removes the existing event listener from the window
				Object.values(events).forEach((item) => {
					window.removeEventListener(item, resetTimer);
				});

				// increase logoutCount on every call.
				logoutCount++;

				dispatch(resetOfficeData());
				dispatch(logout());
			}, 10000); // 10000ms = 10secs. You can change the time.
		} else {
			resetTimer(); // Clear the timer
			Object.values(events).forEach((item) => {
				window.removeEventListener(item, resetTimer);
			});
		}
	};

	const logoutAction = () => {
		if (currentUser) {
			// Listener clean up. Removes the existing event listener from the window
			Object.values(events).forEach((item) => {
				window.removeEventListener(item, resetTimer);
			});
			resetTimer(); // Clear the timer

			dispatch(resetOfficeData());
			dispatch(logout());

			if (logoutCount === 1) {
				toast.success("Logged out after Timeout", {
					position: "top-right",
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: themeColor,
				});
			}

			// Reset the logout count
			logoutCount = 0;
		}
	};

	const assessmentActions = () => {
		return (
			<>
				<div className="feedCard__container">
					<div className="feedCard__list">
						<FeedCard
							priText={"Create New Application"}
							secText={"Clearing"}
							route={"/permit/new"}
						/>
						<FeedCard
							count={44}
							priText={"Awaiting Action"}
							secText={"Clearing"}
						/>
					</div>
				</div>
			</>
		);
	};

	useEffect(() => {
		const getData = async () => {
			try {
				let host = import.meta.env.VITE_SERVER;
				const res = await axios.get(`${host}/staffs/staff`);

				setData(res.data);
				setIsLoading(false);
				console.log(res.data);
				dispatch(loginSuccess(res.data));

				console.log(res.data);
			} catch (error) {
				setIsLoading(false);
				setErr(true);
			}
		};

		getData();

		// return () => {
		// 	second
		// }
	}, [reload]);

	return (
		<>
			<div className="pageWrapper"></div>
			<Header />
			<div className="homeContainer">
				<SideBar />
				<div>
					<div className="home__greetings">Good Morning Orobosa</div>

					<FeedBackground>
						{assessment && assessmentActions()}

						{/* <div className="feedCard__container">
							<div className="feedCard__list">
								<FeedCard
									count={24}
									priText={"Create New Application"}
									secText={"Clearing"}
									route={"/permit/new"}
								/>
								<FeedCard
									count={44}
									priText={"Payment made"}
									secText={"Assessment"}
								/>
								<FeedCard
									count={7}
									priText={"Minuted Files"}
									secText={"Assessment"}
								/>
								<FeedCard
									count={7}
									priText={"Minuted Files"}
									secText={"Assessment"}
								/>
							</div>
						</div>

						<div className="feedCard__container">
							<div className="feedCard__list">
								<FeedCard
									count={24}
									priText={"Create New Application"}
									secText={"Clearing"}
									route={"/permit/new"}
								/>
								<FeedCard
									count={44}
									priText={"Payment made"}
									secText={"Assessment"}
								/>
								<FeedCard
									count={7}
									priText={"Minuted Files"}
									secText={"Assessment"}
								/>
							</div>
						</div>
						<div className="feedCard__container">
							<div className="feedCard__list">
								<FeedCard
									count={24}
									priText={"Create New Application"}
									secText={"Clearing"}
									route={"/permit/new"}
								/>
								<FeedCard
									count={44}
									priText={"Payment made"}
									secText={"Assessment"}
								/>
								<FeedCard
									count={7}
									priText={"Minuted Files"}
									secText={"Assessment"}
								/>
							</div>
						</div>
						<div className="feedCard__container">
							<div className="feedCard__list">
								<FeedCard
									count={24}
									priText={"Create New Application"}
									secText={"Clearing"}
									route={"/permit/new"}
								/>
								<FeedCard
									count={44}
									priText={"Payment made"}
									secText={"Assessment"}
								/>
								<FeedCard
									count={7}
									priText={"Minuted Files"}
									secText={"Assessment"}
								/>
							</div>
						</div> */}
					</FeedBackground>
				</div>
			</div>
			{/* <ToastContainer /> */}
		</>
	);
}
