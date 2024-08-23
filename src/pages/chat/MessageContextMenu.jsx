import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { socket } from "../../utilities/socket";

export const MessageContextMenu = ({ message, userId }) => {
	const { currentUser } = useSelector((state) => state.user);
	const [popupVisible, setPopupVisible] = useState(false);
	const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

	const handleEdit = () => {
		const newContent = prompt("Edit your message:", message.content);
		if (newContent) {
			const newMessage = { ...message, content: newContent };
			socket.emit("editMessage", newMessage);
			setPopupVisible(false);
		}
	};

	const handleDeleteForMe = () => {
		let newMessage;
		if (currentUser._id === message.sender) {
			newMessage = { ...message, deletedForSender: true };
		}
		if (currentUser._id === message.receiver) {
			newMessage = { ...message, deletedForReceiver: true };
		}

		socket.emit("deleteForMe", newMessage);
		setPopupVisible(false);
	};

	const handleDeleteForAll = () => {
		let newMessage = { ...message, deletedForAll: true };

		socket.emit("deleteForAll", newMessage);
		setPopupVisible(false);
	};

	const timeDiff = new Date() - new Date(message.timestamp);
	const canEdit =
		currentUser._id === message.sender && timeDiff < 10 * 60 * 1000; // 10 minutes
	const canDeleteForAll =
		currentUser._id === message.sender && timeDiff < 60 * 60 * 1000; // 1 hour

	// Close popup when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			const popup = document.getElementById("popup-options");
			if (popup && !popup.contains(event.target)) {
				setPopupVisible(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div
			className={`message ${
				currentUser._id === message.sender ? "sent" : "received"
			}`}>
			<svg
				onClick={() => {
					// alert("uAUAUAU");
					setPopupVisible(true);
				}}
				className={`context-button`}
				xmlns="http://www.w3.org/2000/svg"
				height="24"
				viewBox="7 7 10 10"
				width="10">
				<path d="M0 0h24v24H0z" fill="none" />
				<path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
			</svg>
			{popupVisible && (
				<div
					id="popup-options"
					style={{
						position: "absolute",
						top: popupPosition.y,
						left: popupPosition.x,
						backgroundColor: "white",
						border: "1px solid gray",
						boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
						zIndex: 1000,
						borderRadius: "4px",
						padding: "10px",
					}}>
					{canEdit && <button onClick={handleEdit}>Edit</button>}
					<button onClick={handleDeleteForMe}>Delete for me</button>
					{canDeleteForAll && !message.deletedForAll && (
						<button onClick={handleDeleteForAll}>Delete for everyone</button>
					)}
				</div>
			)}
		</div>
	);
};
