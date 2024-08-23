import { format } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";

export const ChatListCard = ({ data }) => {
	const { currentUser } = useSelector((state) => state.user);

	const staff = data.staff;
	const chat = data.chat;
	const activeList = data.activeList;
	const recipient = data.recipient;
	const typing = data.isTyping;
	const sameUser = staff?._id === currentUser?._id;
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
					<span className="name">{sameUser ? "You" : staff?.fullName}</span>
					<div className="message">
						<span></span>

						{!typing ? (
							<>
								{chat.message.deletedForAll ? (
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
										<span className="deletedMessage">
											This message was deleted
										</span>
									</span>
								) : (
									<span className="">{chat.message?.content}</span>
								)}
							</>
						) : (
							<span>Typing...</span>
						)}
					</div>
				</div>
			</div>
			<div className="right">
				<span className="time">
					{format(chat.message?.timestamp, "hh:mm a")}
				</span>
				{/* <span className="count">54,853</span> */}
				{chat.unread > 0 && <span className="count">{chat.unread}</span>}
			</div>
		</div>
	);
};
