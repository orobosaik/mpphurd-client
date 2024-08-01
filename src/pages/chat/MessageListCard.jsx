import React from "react";

export const MessageListCard = ({ data }) => {
	const staff = null;
	return (
		<div
			className={`chat-list-card ${
				data?.id === data?.selectedId && "selected"
			}`}>
			<div className="left">
				<div className="text">
					<span className="name">John Ebuka</span>
					<div className="message">
						<span>You: </span>
						<span className="">How did it go yesterday?</span>
					</div>
				</div>
			</div>
			<div className="right">
				<span className="time">12/02/2024</span>
			</div>
		</div>
	);
};
