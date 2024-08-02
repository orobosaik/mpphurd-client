import React from "react";

export const StaffListCard = ({ data }) => {
	const staff = data.staff[0];
	const activeList = data.activeList;
	const recipient = data.recipient;
	return (
		<div className={`chat-list-card ${staff._id === recipient && "selected"}`}>
			<div className="left">
				<div className="avatar">
					<img
						src={
							staff?.profilePicture
								? `${import.meta.env.VITE_STORAGE_LINK}${staff.profilePicture}`
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
						<span className="">{staff?.position}</span>
					</div>
				</div>
			</div>
		</div>
	);
};
