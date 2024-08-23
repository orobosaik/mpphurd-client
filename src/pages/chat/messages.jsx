import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { socket } from "../../utilities/socket";
import {
	KebabDiningRounded,
	MenuOpenRounded,
	MoreVertRounded,
	ThreeDRotationRounded,
} from "@mui/icons-material";
import { MessageContextMenu } from "./MessageContextMenu";
import { addMessage } from "../../redux/userSlice";

const Message = ({ message, userId }) => {
	const { currentUser, chat } = useSelector((state) => state.user);
	const [contextMenuVisible, setContextMenuVisible] = useState(false);
	const [showError, setShowError] = useState(false);
	const [reload, setReload] = useState([]);

	const user =
		currentUser._id === message.sender
			? "sender"
			: currentUser._id === message.receiver
			? "receiver"
			: "";

	const resendMessage = async (message) => {
		// filter

		setReload(() => []);
		socket.emit("directMessage", message);
	};

	useEffect(() => {
		if (showError) {
			setShowError(false);
		}
		const timer = setTimeout(() => {
			setShowError(true);
		}, 10000);

		return () => {
			clearTimeout(timer);
		};
	}, [reload]);

	return (
		<>
			{(user === "sender" && message.deletedForSender) ||
			(user === "receiver" && message.deletedForReceiver) ? (
				<></>
			) : (
				<div
					className={`message ${
						currentUser._id === message.sender ? "sent" : "received"
					}`}>
					<div
						className="message-content"
						onMouseEnter={() => setContextMenuVisible(true)}
						onMouseLeave={() => setContextMenuVisible(false)}>
						<div className="message-wrapper">
							{message.deletedForAll ? (
								<span className="align-center deleted ">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width="14"
										height="14"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round">
										<circle cx="12" cy="12" r="10" />
										<line x1="8" y1="16" x2="16" y2="8" />
									</svg>
									<span className="deletedMessage">This message was deleted</span>
								</span>
							) : (
								<>
									<p>{message.content}</p>
									<div className="message-info">
										<div className="status">
											{currentUser._id === message.sender && (
												<>
													{showError && !message.saved && (
														<span
															onClick={() => resendMessage(message)}
															className="resend">
															Resend
														</span>
													)}
												</>
											)}
										</div>

										<span className="timestamp">
											{message.edited && <span>Edited~</span>}
											{format(message.timestamp, "hh:mm a")}

											{currentUser._id === message.sender && (
												<>
													{/* Message sent */}
													{((message.saved && !message.delivered) ||
														(!message.saved && !message.delivered)) && (
														<span className="sent">
															<svg
																width="12"
																height="12"
																viewBox="0 0 24 24"
																fill="none"
																xmlns="http://www.w3.org/2000/svg">
																<path
																	d="M2 12L9 19L22 3"
																	stroke="currentColor"
																	strokeWidth="2"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
															</svg>
														</span>
													)}
													{/* Message sent and delivered */}
													{message.delivered && !message.read && (
														<span className="sent">
															<svg
																width="14"
																height="14"
																viewBox="0 0 24 24"
																fill="none"
																xmlns="http://www.w3.org/2000/svg">
																<path
																	d="M2 12L9 19L22 3"
																	stroke="currentColor"
																	stroke-width="2"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																/>
																<path
																	d="M2 12L9 19L22 3"
																	stroke="currentColor"
																	stroke-width="2"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	transform="translate(7, -1)"
																/>
															</svg>
														</span>
													)}
													{/* Message sending */}
													{/* {!showError && !message.saved && (
												<span className="sent">
													<svg
														width="12"
														height="12"
														viewBox="0 0 100 100"
														xmlns="http://www.w3.org/2000/svg"
														style={{
															animation: "rotate 1s linear infinite",
														}}>
														<defs>
															<style>
																{`  @keyframes rotate {
										0% {
												transform: rotate(0deg)
										}
										100% {
												transform: rotate(360deg)
										}
								}`}
															</style>
														</defs>
														<circle
															cx="50"
															cy="50"
															r="40"
															stroke="currentColor"
															stroke-width="8"
															fill="none"
															stroke-linecap="round"
															stroke-dasharray="60, 200"
														/>
													</svg>
												</span>
											)} */}
													{/* Message Error or Message not sent */}
													{showError && !message.saved && (
														<span className="sent">
															<svg
																width="20"
																height="20"
																viewBox="0 0 100 100"
																xmlns="http://www.w3.org/2000/svg">
																<circle cx="50" cy="50" r="48" fill="#e74c3c" />
																<rect
																	x="48"
																	y="30"
																	width="10"
																	height="30"
																	fill="white"
																/>
																<rect
																	x="48"
																	y="70"
																	width="10"
																	height="8"
																	fill="white"
																/>
															</svg>
														</span>
													)}

													{/* Message read */}
													{message.read && (
														<span className="read">
															<svg
																width="14"
																height="14"
																viewBox="0 0 24 24"
																fill="none"
																xmlns="http://www.w3.org/2000/svg">
																<path
																	d="M2 12L9 19L22 3"
																	stroke="currentColor"
																	stroke-width="2"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																/>
																<path
																	d="M2 12L9 19L22 3"
																	stroke="currentColor"
																	stroke-width="2"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	transform="translate(6, -1)"
																/>
															</svg>
														</span>
													)}
												</>
											)}
										</span>
									</div>
								</>
							)}
						</div>
						{contextMenuVisible && (
							<div>
								<MessageContextMenu message={message} />
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export const Messages = ({ data }) => {
	const list = data.allDirectMessages || [];
	const recipient = data.recipient;
	const typing = data.isTyping;
	const { currentUser } = useSelector((state) => state.user);
	return (
		<>
			{list.length < 1 && (
				<div className="chat-empty">
					<p>No Messages</p>
				</div>
			)}

			{list
				.filter(
					(msg) =>
						(msg.receiver === recipient && msg.sender === currentUser._id) ||
						(msg.receiver === currentUser._id && msg.sender === recipient)
				)
				.map((e, i) => {
					return <Message key={i} message={e} />;
				})}

			{typing && recipient !== currentUser._id && (
				<div className="typing">
					<div className="message-content">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			)}
		</>
	);
};
