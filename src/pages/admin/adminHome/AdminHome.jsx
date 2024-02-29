import AdminHeader from "../../../components/adminHeader/AdminHeader";
import AdminSideBar from "../../../components/adminSideBar/AdminSideBar";
import FeedBackground from "../../../components/feedBackground/FeedBackground";
import FeedCard from "../../../components/feedCard/FeedCard";
import Header from "../../../components/header/Header";
import SideBar from "../../../components/sidebar/SideBar";
import CreateApplication from "../../createApplication/CreateApplication";
import "./adminHome.css";

import { format, getHours } from "date-fns";
import { getThemeColor } from "../../../utilities/themeColor";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../../../redux/userSlice";
import { resetOfficeData } from "../../../redux/appSlice";
import { adminLogout } from "../../../redux/adminSlice";
import { toast } from "react-toastify";

const events = [
	"load",
	"mousemove",
	"mousedown",
	"click",
	"scroll",
	"keypress",
];
let logoutCount = 0;

export default function AdminHome() {
	const { currentAdmin, loading } = useSelector((state) => state.admin);
	const themeColor = getThemeColor();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	const [reload, setReload] = useState();
	const [err, setErr] = useState(false);

	const [isLogout, setIsLogout] = useState(0);

	// AUTO LOG OUT FUNCTIONALITY
	let timer;

	// this resets the timer if it exists.
	const resetTimer = () => {
		if (timer) clearTimeout(timer);
	};

	useEffect(() => {
		if (currentAdmin) {
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
		const time = import.meta.env.VITE_ADMIN_LOGOUT_TIMER;
		// console.log(Number(time))
		if (currentAdmin) {
			// Add this check to ensure the user is still authenticated
			timer = setTimeout(() => {
				// clears any pending timer.
				resetTimer();
				// console.log("INSIDE TIMER");

				// logs out user
				// logoutAction();

				if (logoutCount === 1) {
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

				// dispatch(resetOfficeData());
				dispatch(adminLogout());
				window.location.reload();
			}, 1000 * 60 * time); // 1000ms = 1secs. You can change the time in .env file.
		} else {
			resetTimer(); // Clear the timer
			Object.values(events).forEach((item) => {
				window.removeEventListener(item, resetTimer);
			});
		}
	};

	// FORMAT GREETING
	const getGreeting = () => {
		// Get the current time
		const currentTime = new Date();

		// Get the hour from the current time
		const currentHour = getHours(currentTime);

		// Display the appropriate greeting based on the current time
		let greeting;
		if (currentHour >= 5 && currentHour < 12) {
			greeting = "Good Morning";
		} else if (currentHour >= 12 && currentHour < 18) {
			greeting = "Good Afternoon";
		} else {
			greeting = "Good Evening";
		}

		// Display the greeting with the formatted date
		// console.log(`${greeting} ${currentAdmin?.firstName}`);
		return `${greeting} ${currentAdmin?.firstName} (Admin)`;
	};
	const getGreetingDate = () => {
		// Get the current time
		const currentTime = new Date();
		// Format the current date
		const formattedDate = format(currentTime, "EEEE, MMMM do, yyyy");
		return `${formattedDate}`;
	};

	return (
		<>
			<div className="pageWrapper"></div>
			<AdminHeader />
			<div className="homeContainer">
				<AdminSideBar />
				<div className="homePage">
					<div className="home__greetings">
						<span>{getGreeting()}</span>
						<span>{getGreetingDate()}</span>
					</div>

					<FeedBackground>
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
		</>
	);
}
