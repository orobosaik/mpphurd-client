import React, { useState } from "react";
import "./notifications.css";
import {
	ClearAllRounded,
	ClearRounded,
	DeleteRounded,
	Notifications,
	RemoveCircleRounded,
} from "@mui/icons-material";

const NotificationCard = ({ notification, onClear }) => {
	return (
		<div className="notification-card">
			<img src="/assets/logos/Logo-Mpphurd.png" alt="" className="avatar" />

			<div className="notification-content">
				<h4 className="notification-title">New message from John</h4>
				<p className="notification-body">
					Hey! Are we still on for the meeting tomorrow?
				</p>
				<p className="notification-action">View Plan</p>
				<span className="notification-time">10 mins ago</span>
			</div>

			{/* <p>{notification.message}</p> */}
			<span className="clear-button" onClick={() => onClear(notification.id)}>
				<ClearRounded className="" />
			</span>
		</div>
	);
};

const NotificationsPanel = () => {
	const [notifications, setNotifications] = useState([
		// { id: 1, message: "New comment on your post." },
		// { id: 1, message: "New comment on your post." },
		// { id: 2, message: "You have a new follower." },
		// { id: 2, message: "You have a new follower." },
		// { id: 3, message: "Your password was changed successfully." },
		// { id: 3, message: "Your password was changed successfully." },
		// { id: 3, message: "Your password was changed successfully." },
		// { id: 3, message: "Your password was changed successfully." },
		// { id: 3, message: "Your password was changed successfully." },
	]);
	const [isOpen, setIsOpen] = useState(false);

	const togglePanel = () => {
		setIsOpen(!isOpen);
	};

	const clearNotification = (id) => {
		setNotifications(
			notifications.filter((notification) => notification.id !== id)
		);
	};

	const clearAllNotifications = () => {
		setNotifications([]);
	};

	return (
		<div className="notifications">
			<div className="notification-icon headerIconItem" onClick={togglePanel}>
				<Notifications className="notificationIcon" />
				{/* <span className="headerIconBadge">3</span> */}
			</div>

			{isOpen && (
				<div className={`notifications-panel ${isOpen ? "visible" : ""}`}>
					<div className="notifications-header">
						<h3>Notifications</h3>
						<span className="clear-all" onClick={clearAllNotifications}>
							Clear All
						</span>
					</div>
					<div className="notifications-list">
						{notifications.length === 0 && (
							<div className="notifications-empty">
								<p>No notifications</p>
							</div>
						)}
						{notifications.map((notification) => (
							<NotificationCard
								key={notification.id}
								notification={notification}
								onClear={clearNotification}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default NotificationsPanel;
