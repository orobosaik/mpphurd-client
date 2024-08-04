import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Home from "../pages/home/Home";
import Plan from "../pages/plan/Plan.jsx";
import CreateApplication from "../pages/createApplication/CreateApplication";
import Office from "../pages/office/Office";
import Minute from "../pages/minute/Minute";
import CreateBill from "../pages/createBill/CreateBill";
import ViewBill from "../pages/viewBill/ViewBill";
import ActivitiesView from "../pages/activitiesView/ActivitiesView";
import Analysis from "../pages/analysis/Analysis";
import BuildingControl from "../pages/buildingControl/BuildingControl";
import Petition from "../pages/petition/Petition";
import Approval from "../pages/approval/Approval";
import DocumentView from "../pages/documentView/DocumentView";
import LoginPage from "../pages/loginPage/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { getThemeColor, setThemeColor } from "./themeColor";
import OfficeSelect from "../pages/officeSelect/OfficeSelect.jsx";
import DevelopmentControl from "../pages/buildingControl/BuildingControl";
import InDevelopment from "../pages/inDevelopment/InDevelopment.jsx";
import Profile from "../pages/profile/Profile.jsx";
import Activity from "../pages/activity/Activity.jsx";
import OfficeSetting from "../pages/officeSetting/OfficeSetting.jsx";
import Chat from "../pages/chat/chat.jsx";
import { socket } from "./socket.js";
import {
	addMessage,
	endTyping,
	logout,
	setActiveList,
	setChat,
	setChatList,
	setTotalUnreadCount,
	startTyping,
} from "../redux/userSlice.js";
import { resetOfficeData } from "../redux/appSlice.js";

const events = [
	"load",
	"mousemove",
	"mousedown",
	"click",
	"scroll",
	"keypress",
];

function LoggedWrapper() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { currentUser, chat } = useSelector((state) => state.user);
	const { theme } = useSelector((state) => state.app);
	const themeColor = getThemeColor();
	// console.log(currentUser);

	const [allDirectMessages, setAllDirectMessages] = useState([]);
	const [typingUsers, setTypingUsers] = useState({});

	const receivedSound = new Audio("/assets/sound/received.mp3");
	const notificationSound = new Audio("/assets/sound/notification.mp3");

	useEffect(() => {
		setThemeColor(theme);
	}, [theme]);

	// let logoutCount = 0;
	// // AUTO LOG OUT FUNCTIONALITY
	// let timer;

	// // this resets the timer if it exists.
	// const resetTimer = () => {
	// 	if (timer) clearTimeout(timer);
	// };

	// useEffect(() => {
	// 	if (currentUser) {
	// 		Object.values(events).forEach((item) => {
	// 			window.addEventListener(item, () => {
	// 				resetTimer();
	// 				handleLogoutTimer();
	// 			});
	// 		});

	// 		return () => {
	// 			resetTimer();
	// 			// Listener clean up. Removes the existing event listener from the window
	// 			Object.values(events).forEach((item) => {
	// 				window.removeEventListener(item, resetTimer);
	// 			});
	// 		};
	// 	}
	// });

	// // this function sets the timer that logs out the user after 10 secs
	// const handleLogoutTimer = () => {
	// 	const time = import.meta.env.VITE_LOGOUT_TIMER;
	// 	if (currentUser) {
	// 		// Add this check to ensure the user is still authenticated
	// 		timer = setTimeout(() => {
	// 			// clears any pending timer.
	// 			resetTimer();
	// 			// console.log("INSIDE TIMER");

	// 			// logs out user
	// 			// logoutAction();

	// 			if (logoutCount === 1) {
	// 				toast.error("Session Timeout", {

	// 				});
	// 			}

	// 			// Listener clean up. Removes the existing event listener from the window
	// 			Object.values(events).forEach((item) => {
	// 				window.removeEventListener(item, resetTimer);
	// 			});

	// 			// increase logoutCount on every call.
	// 			logoutCount++;

	// 			socket.disconnect();
	// 			socket.on("disconnected", () => {
	// 				console.log(`I'm disconnected from the back-end`);
	// 			});
	// 			dispatch(logout());
	// 			dispatch(resetOfficeData());

	// 			window.location.reload();
	// 		}, 1000 * 60 * time); // 1000ms = 1secs. You can change the time in .env file.
	// 	} else {
	// 		resetTimer(); // Clear the timer
	// 		Object.values(events).forEach((item) => {
	// 			window.removeEventListener(item, resetTimer);
	// 		});
	// 	}
	// };

	// Connect Socket Io
	useEffect(() => {
		const connectSocket = () => {
			socket.auth = { userId: currentUser._id };
			socket.connect();
			socket.on("connect", () => {
				console.log(`I'm connected with the back-end`);
			});
			socket.onAny((event, ...args) => {
				console.log(event, args);
			});
			socket.on("users", (data) => {
				const { [currentUser._id]: _, ...list } = data;

				dispatch(setActiveList(list));
				console.log("USER:", list);
			});
		};
		connectSocket();
		return () => {
			console.log("LOGOUT WORKING");
			socket.off("connect", () => {
				console.log(`I'm disconnected with the back-end`);
			});
			socket.off("users", () => {
				console.log("USER GONE");
			});
			// socket.off("directMessage");
			// socket.off("allDirectMessages");
			// socket.off("messageRead");
			// console.log("LOGOUT WORKING222");
		};
	}, []);

	// Receive Messages
	useEffect(() => {
		// Request notification permission
		if (Notification.permission !== "granted") {
			Notification.requestPermission();
		}
		socket.on("directMessage", (data) => {
			console.log("INSIDE CLIENT DIRECT MSSG");

			receivedSound.play();

			const newActiveChats = getActiveChats(
				[...chat.allDirectMessages, data],
				currentUser._id
			);

			const totalUnreadCount = Object.values(newActiveChats).reduce(
				(acc, chat) => acc + chat.unread,
				0
			);
			// setActiveChats(newActiveChats);
			dispatch(setTotalUnreadCount(totalUnreadCount));
			dispatch(setChatList(newActiveChats));
			dispatch(addMessage(data));
			showNotification(data);
		});

		socket.on("typing", (data) => {
			// Logic

			// Set the user as active
			setTypingUsers((prev) => ({
				...prev,
				[data.sender]: true,
			}));
			dispatch(startTyping(data.sender));

			// Clear the existing timeout for the user if it exists
			if (typingUsers[data.sender]?.timeoutId) {
				clearTimeout(typingUsers[data.sender].timeoutId);
			}
			// Set a new timeout to set the user to inactive after 5 seconds
			const timeoutId = setTimeout(() => {
				setTypingUsers((prev) => {
					const { [data.sender]: _, ...newUsers } = prev;
					return newUsers;
				});
				dispatch(endTyping(data.sender));
			}, 2000);
			// Store the timeout ID in activeUsers state
			setTypingUsers((prev) => ({
				...prev,
				[data.sender]: { isActive: true, timeoutId },
			}));
		});

		socket.on("allDirectMessages", (data) => {
			console.log("INSIDE CLIENT ALL DIRECT MSSG");
			setAllDirectMessages(data);
		});
		socket.on("messageRead", (data) => {
			setAllDirectMessages((prev) =>
				prev.map((msg) =>
					msg.timestamp === data.timestamp ? { ...msg, read: true } : msg
				)
			);
		});

		return () => {
			socket.off("directMessage");
			socket.off("allDirectMessages");
			socket.off("messageRead");
			socket.off("typing");
			console.log("LOGOUT WORKING222");
		};
	}, []);

	// Cleanup timeouts when the component unmounts
	useEffect(() => {
		return () => {
			Object.values(typingUsers).forEach(({ timeoutId }) => {
				if (timeoutId) {
					clearTimeout(timeoutId);
				}
			});
		};
	}, [typingUsers]);

	useEffect(() => {
		return () => {
			const newActiveChats = getActiveChats(
				chat.allDirectMessages,
				currentUser._id
			);

			const totalUnreadCount = Object.values(newActiveChats).reduce(
				(acc, chat) => acc + chat.unread,
				0
			);
			// setActiveChats(newActiveChats);
			dispatch(setTotalUnreadCount(totalUnreadCount));
			dispatch(setChatList(newActiveChats));
		};
	}, [chat.allDirectMessages]);

	function getActiveChats(messages, currentUserId) {
		// Filter out messages where the current user is not the sender or receiver
		const filteredMessages = messages.filter(
			(msg) => msg.sender === currentUserId || msg.receiver === currentUserId
		);

		// Create a dictionary to store the latest message for each user
		const latestMessages = {};

		// Iterate over the filtered messages
		filteredMessages.forEach((msg) => {
			// Get the user ID (either sender or receiver)
			const userId = msg.sender === currentUserId ? msg.receiver : msg.sender;

			// If the user ID is not in the dictionary or the current message is newer
			if (
				!latestMessages[userId] ||
				msg.timestamp > latestMessages[userId].message.timestamp
			) {
				// Update the dictionary with the latest message
				latestMessages[userId] = {
					message: { ...msg },
					unread: filteredMessages.filter(
						(m) =>
							m.sender === userId && m.receiver === currentUserId && !m.read
					).length,
				};
			}
		});

		// Sort the messages by timestamp
		const sortedMessages = Object.keys(latestMessages)
			.sort(
				(a, b) =>
					latestMessages[b].message.timestamp -
					latestMessages[a].message.timestamp
			)
			.reduce((acc, key) => {
				acc[key] = latestMessages[key];
				return acc;
			}, {});

		return sortedMessages;
	}

	const showNotification = (messageData) => {
		if (Notification.permission === "granted") {
			const notification = new Notification("New message", {
				body: `${messageData.sender}: ${messageData.content}`,
				icon: "assets/logos/Logo-Mpphurd.png",
				badge: "assets/logos/Logo-Mpphurd.png",
				vibrate: [200, 100, 200],
			});

			notification.onclick = () => {
				// Logic to focus on the chat window when the notification is clicked
				window.focus();
				// Optionally, navigate to the chat page or open the chat modal
			};
		}
	};

	// useEffect(() => {
	// 	if (!currentUser) {
	// 		navigate("/login");
	// 	}
	// 	// return () => {};
	// }, [currentUser]);

	return (
		<>
			{/* <div>WORKING YEAH</div> */}

			<Routes>
				{/* HOME PAGE */}
				<Route path="/">
					<Route
						index
						// element={!currentUser ? <Navigate to="/login" /> : <Home />}
						element={<Home />}
					/>
				</Route>

				{/* PERMIT | APPROVAL */}
				<Route path="/permit">
					{/* <Route index element={currentUser && <Approval />} /> */}
					<Route index element={<OfficeSelect />} />

					<Route path="new" element={<CreateApplication />} />
					<Route path=":id">
						<Route index element={<Plan />} />
						<Route path="bills" element={<ViewBill />} />
						<Route path="create_bill" element={<CreateBill />} />
						<Route path="minute" element={<Minute />} />
						<Route path="documents" element={<DocumentView />} />
					</Route>
					<Route path="office">
						<Route path=":id" element={<Office />} />
					</Route>
				</Route>

				{/* PETITION */}
				<Route path="/petition">
					<Route index element={<InDevelopment />} />
				</Route>

				{/* BUILDING CONTROL */}
				<Route path="/b_control">
					{/* <Route index element={<BuildingControl />} /> */}
					<Route index element={<InDevelopment />} />
				</Route>

				{/* DEVELOPMENT CONTROL */}
				<Route path="/d_control">
					{/* <Route index element={<DevelopmentControl />} /> */}
					<Route index element={<InDevelopment />} />
				</Route>

				{/* ACTIVITIES */}
				<Route path="/activities">
					{/* <Route index element={<ActivitiesView />} /> */}
					<Route index element={<Activity />} />
				</Route>
				{/* ANALYSIS */}
				<Route path="/analysis">
					{/* <Route index element={<Analysis />} /> */}
					<Route index element={<Analysis />} />
				</Route>

				{/* PROFILE */}
				<Route path="/profile">
					<Route index element={<Profile />} />

					<Route path="new" element={<CreateApplication />} />
					<Route path=":id">
						<Route index element={<Plan />} />
						<Route path="bills" element={<ViewBill />} />
						<Route path="create_bill" element={<CreateBill />} />
						<Route path="minute" element={<Minute />} />
						<Route path="documents" element={<DocumentView />} />
					</Route>
					<Route path="office">
						<Route path=":id" element={<Office />} />
					</Route>
				</Route>

				{/* OFFICE SETTING */}
				<Route path="/office_setting">
					<Route index element={<OfficeSetting />} />

					<Route path="new" element={<CreateApplication />} />
					<Route path=":id">
						<Route index element={<Plan />} />
						<Route path="bills" element={<ViewBill />} />
						<Route path="create_bill" element={<CreateBill />} />
						<Route path="minute" element={<Minute />} />
						<Route path="documents" element={<DocumentView />} />
					</Route>
					<Route path="office">
						<Route path=":id" element={<Office />} />
					</Route>
				</Route>

				{/* CHAT  */}
				<Route path="/chat">
					<Route index element={<Chat />} />

					<Route path="new" element={<CreateApplication />} />
					<Route path=":id">
						<Route index element={<Plan />} />
						<Route path="bills" element={<ViewBill />} />
						<Route path="create_bill" element={<CreateBill />} />
						<Route path="minute" element={<Minute />} />
						<Route path="documents" element={<DocumentView />} />
					</Route>
					<Route path="office">
						<Route path=":id" element={<Office />} />
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default LoggedWrapper;
