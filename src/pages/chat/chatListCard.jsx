import { format } from "date-fns";
import React from "react";

export const ChatListCard = ({ data }) => {
	const staff = data.staff;
	const chat = data.chat;
	const activeList = data.activeList;
	const recipient = data.recipient;
	const typing = data.isTyping;
console.log(chat)
	return (
		<div className={`chat-list-card ${staff?._id === recipient && "selected"}`}>
			<div className="left">
				<div className="avatar">
					<img
						src={
							staff?.profilePicture
								? `${import.meta.env.VITE_STORAGE_LINK}${staff?.profilePicture}`
								: "/assets/persons/no_avatar.png"
						}
						alt=""
						srcSet=""
					/>
					{staff?._id in activeList && <div className="online-dot"></div>}
				</div>
				<div className="text">
					<span className="name">{staff?.fullName}</span>
					<div className="message">
						<span></span>

						{!typing ? (
							<span className="">{chat.message.content}</span>
						) : (
							<span>Typing...</span>
						)}
					</div>
				</div>
			</div>
			<div className="right">
				<span className="time">
					{format(chat.message.timestamp, "hh:mm a")}
				</span>
				{/* <span className="count">54,853</span> */}
				{chat.unread > 0 && <span className="count">{chat.unread}</span>}
			</div>
		</div>
	);
};
