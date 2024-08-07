import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import AdminRoutes from "./utilities/AdminRoutes";
import MainRoutes from "./utilities/MainRoutes";
import { ToastContainer } from "react-toastify";
import AnimatedBackground from "./widgets/animatedBackground/AnimatedBackground";
import { socket } from "./utilities/socket.js";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { getThemeColor, setThemeColor } from "./utilities/themeColor.js";

import {
	addMessage,
	endTyping,
	logout,
	setActiveList,
	setAllDirectMessages,
	setChat,
	setChatList,
	setTotalUnreadCount,
	startTyping,
} from "./redux/userSlice.js";
import { setupInterceptors } from "./utilities/fetcher.js";

function App() {
	const [view, setView] = useState(null);
	const themeColor = getThemeColor();

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { currentUser, chat } = useSelector((state) => state.user);
	// console.log(currentUser);

	const [typingUsers, setTypingUsers] = useState({});

	const receivedSound = new Audio("/assets/sound/received.mp3");
	const notificationSound = new Audio("/assets/sound/notification.mp3");

	useEffect(() => {
		// socket.on("users", (data) => {
		// 	console.log("USER:", data);
		// });
		const host = window.location.host;

		// const path = window.location.pathname;
		// const arr = path.split("/");

		// const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : 1);
		const arr = host.split(".");

		if (
			arr[0].toLowerCase() === "admin-mpphurd" ||
			arr[0].toLowerCase() === "test-mpphurdadmin" ||
			arr[0].toLowerCase() === "mpphurdadmintest"
		) {
			setView("admin");
		} else if (
			arr[0].toLowerCase() === "mpphurd" ||
			arr[0].toLowerCase() === "test-mpphurduser" ||
			arr[0].toLowerCase() === "mpphurdtest"
		) {
			setView("staff");
		}

		// if (arr.length < 3 && arr[0].toLowerCase() === "admin-mpphurd") {
		// 	setView("admin");
		// } else if (arr.length < 3 && arr[0].toLowerCase() === "mpphurd") {
		// 	setView("staff");
		// }
	}, [window.location.host]);

	useEffect(() => {
		setupInterceptors(dispatch, navigate);
	}, [navigate]);

	// Connect Socket Io
	useEffect(() => {
		const connectSocket = () => {
			socket.on("connect", () => {
				console.log(`I'm connected with the back-end`);
			});
			socket.onAny((event, ...args) => {
				console.log(event, args);
			});
			socket.on("users", (data) => {
				const { [currentUser?._id]: _, ...list } = data;

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
		};
	}, []);

	// Receive Messages
	useEffect(() => {
		socket.on("directMessage", (data) => {
			console.log("INSIDE CLIENT DIRECT MSSG");

			console.log("SENDER === CURRENT: " + (data.sender == currentUser._id));
			console.log("SENDER: " + data.sender);
			console.log("CURRENT: " + currentUser._id);
			if (data.sender === currentUser._id) {
				let isOldMessage;

				const messages = chat.allDirectMessages.map((msg) => {
					const isSameMessage = msg.key === data.key;
					console.log([msg, data]);
					if (isSameMessage) {
						isOldMessage = true;
					}
					console.log("ISOLDMESSAGE: " + isOldMessage);
					console.log("ISTHESAMEMESSAGE: " + isSameMessage);
					return isSameMessage ? data : msg;
				});

				console.log("INSIDE AFTER FILTER OF SAME OWNER OF MESSAGE");
				!isOldMessage
					? dispatch(addMessage(data))
					: dispatch(setAllDirectMessages(messages));

				console.log(data);
				console.log(chat.allDirectMessages);
				console.log(messages);
			} else {
				// Request notification permission
				if (Notification.permission !== "granted") {
					Notification.requestPermission();
				}

				receivedSound.play();

				dispatch(addMessage(data));
				showNotification(data);
				console.log("INSIDE AFTER FILTER OF NEW TYPE OF MESSAGE");
			}
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
			dispatch(setAllDirectMessages(data));
		});
		socket.on("messageRead", (data) => {
			setAllDirectMessages((prev) =>
				prev.map((msg) =>
					msg.timestamp === data.timestamp ? { ...msg, read: true } : msg
				)
			);
		});

		socket.on("editMessage", (updatedMessage) => {
			// setMessages((prevMessages) =>
			// 	prevMessages.map((msg) =>
			// 		msg.id === updatedMessage.id ? updatedMessage : msg
			// 	)
			// );

			const newAllDirectMessages = chat.allDirectMessages.map((msg) =>
				msg.id === updatedMessage.id ? updatedMessage : msg
			);
			dispatch(setAllDirectMessages(newAllDirectMessages));
		});

		socket.on("deleteForMe", (messageId) => {
			// setMessages((prevMessages) =>
			// 	prevMessages.map((msg) =>
			// 		msg.id === messageId ? { ...msg, deletedForMe: true } : msg
			// 	)
			// );
			const newAllDirectMessages = chat.allDirectMessages.map((msg) =>
				msg.id === messageId ? { ...msg, deletedForMe: true } : msg
			);
			dispatch(setAllDirectMessages(newAllDirectMessages));
		});

		socket.on("deleteForAll", (messageId) => {
			// setMessages((prevMessages) =>
			// 	prevMessages.map((msg) =>
			// 		msg.id === messageId ? { ...msg, deletedForAll: true } : msg
			// 	)
			// );

			const newAllDirectMessages = chat.allDirectMessages.map((msg) =>
				msg.id === messageId ? { ...msg, deletedForAll: true } : msg
			);
			dispatch(setAllDirectMessages(newAllDirectMessages));
		});

		return () => {
			socket.off("directMessage");
			socket.off("allDirectMessages");
			socket.off("messageRead");
			socket.off("typing");
			socket.off("editMessage");
			socket.off("deleteForMe");
			socket.off("deleteForAll");

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

	return (
		<>
			<AnimatedBackground />
			<div className="pageWrapper"></div>

			{view === "staff" ? (
				<MainRoutes />
			) : view === "admin" ? (
				<AdminRoutes />
			) : (
				""
			)}
			<ToastContainer
				autoClose={3000}
				hideProgressBar={false}
				closeOnClick={true}
				pauseOnHover={true}
				draggable={true}
				theme={themeColor}
			/>
		</>
	);
}

export default App;
