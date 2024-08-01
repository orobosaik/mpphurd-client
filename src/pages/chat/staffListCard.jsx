import React from "react";

export const StaffListCard = ({ data }) => {
	const staff = data.user;
	return (
		<div
			className={`chat-list-card ${
				staff?._id === data?.recipient?._id && "selected"
			}`}>
			<div className="left">
				<span className="avatar">
					<img
						src={
							staff?.profilePicture
								? `${import.meta.env.VITE_STORAGE_LINK}${staff.profilePicture}`
								: "/assets/persons/no_avatar.png"
						}
						alt=""
						srcSet=""
					/>
				</span>
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
