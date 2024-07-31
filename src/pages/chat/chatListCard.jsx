import React from "react";

export const ChatListCard = () => {
	const staff = null;
	return (
		<div className="chat-list-card">
			<div className="left">
				<span className="avatar">
					<img
						src={
							staff?.profilePicture
								? `${import.meta.env.VITE_STORAGE_LINK}${staff.profilePicture}`
								: "/assets/persons/no_avatar.png"
						}
						alt=""
						srcset=""
					/>
				</span>
				<div className="text">
					<span className="name">Orobosa Ikponmwosa</span>
					<div className="message">
						<span></span>
						<span className="">I'm doing well, thanks for asking! How about you?</span>
					</div>
				</div>
			</div>
			<div className="right">
				<span className="time">12:32</span>
				<span className="count">4</span>
			</div>
		</div>
	);
};
