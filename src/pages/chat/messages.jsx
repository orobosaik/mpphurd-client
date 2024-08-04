import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { socket } from "../../utilities/socket";
import {
	KebabDiningRounded,
	MenuOpenRounded,
	MoreVertRounded,
	ThreeDRotationRounded,
} from "@mui/icons-material";
import { MessageContextMenu } from "./MessageContextMenu";

const Message = ({ message, userId }) => {
	const { currentUser } = useSelector((state) => state.user);
	const [contextMenuVisible, setContextMenuVisible] = useState(false);

	return (
		<div
			className={`message ${
				currentUser._id === message.sender ? "sent" : "received"
			}`}>
			<div
				className="message-content"
				onMouseEnter={() => setContextMenuVisible(true)}
				onMouseLeave={() => setContextMenuVisible(false)}>
				<div>
					{message.deletedForAll ? (
						"This message was deleted."
					) : (
						<>
							<p>{message.content}</p>
							<span className="timestamp">
								{format(message.timestamp, "hh:mm a")}
							</span>
						</>
					)}
					{message.deletedForAll ? <span>(Deleted by sender)</span> : null}
					{message.edited ? <span>(Edited)</span> : null}
				</div>
				{contextMenuVisible && (
					<div>
						<MessageContextMenu message={message} />
					</div>
				)}
			</div>
		</div>
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
				.filter((msg) => msg.receiver === recipient || msg.sender === recipient)
				.map((e, i) => {
					return (
						// <div
						// 	key={i}
						// 	className={`message ${
						// 		currentUser._id === e.sender ? "sent" : "received"
						// 	}`}>
						// 	<div className="message-content">
						// 		<p>{e.content}</p>
						// 		<span className="timestamp">
						// 			{format(e.timestamp, "hh:mm a")}
						// 		</span>
						// 	</div>
						// </div>
						<Message message={e} />
					);
				})}

			{typing && (
				<div className="typing received">
					<div className="message-content">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			)}

			{/* <div className="message received">
				<div className="message-content">
					<p>I'm doing well, thanks for asking!</p>
					<span className="timestamp">10:02 AM</span>
				</div>
			</div>
			<div className="message sent">
				<div className="message-content">
					<p>Great to hear!</p>
					<span className="timestamp">10:03 AM</span>
				</div>
			</div>
			<div className="message received">
				<div className="message-content">
					<p>Hello! How are you?</p>
					<span className="timestamp">10:00 AM</span>
				</div>
			</div>
			<div className="message sent">
				<div className="message-content">
					<p>I'm good, thanks! How about you?</p>
					<span className="timestamp">10:01 AM</span>
				</div>
			</div>
			<div className="message received">
				<div className="message-content">
					<p>I'm doing well, thanks for asking!</p>
					<span className="timestamp">10:02 AM</span>
				</div>
			</div>
			<div className="message sent">
				<div className="message-content">
					<p>Great to hear!</p>
					<span className="timestamp">10:03 AM</span>
				</div>
			</div>
			<div className="message received">
				<div className="message-content">
					<p>Hello! How are you?</p>
					<span className="timestamp">10:00 AM</span>
				</div>
			</div>
			<div className="message sent">
				<div className="message-content">
					<p>I'm good, thanks! How about you?</p>
					<span className="timestamp">10:01 AM</span>
				</div>
			</div>
			<div className="message received">
				<div className="message-content">
					<p>I'm doing well, thanks for asking!</p>
					<span className="timestamp">10:02 AM</span>
				</div>
			</div>
			<div className="message sent">
				<div className="message-content">
					<p>Great to hear!</p>
					<span className="timestamp">10:03 AM</span>
				</div>
			</div> */}
		</>
	);
};
