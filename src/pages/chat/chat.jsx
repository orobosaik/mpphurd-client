import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import TopBar from "../../components/topBar/TopBar";
import { AddRounded, CloseRounded, Search } from "@mui/icons-material";
import { ChatListCard } from "./chatListCard";
import { StaffListCard } from "./staffListCard";
import { MessageListCard } from "./MessageListCard";
import Fuse from "fuse.js";
import { fetchInstance } from "../../utilities/fetcher";
import { useDispatch, useSelector } from "react-redux";
import { Messages } from "./messages";
import { socket } from "../../utilities/socket";
import { setChat } from "../../redux/userSlice";

const Chat = () => {
	const dispatch = useDispatch();
	const { currentUser, chat } = useSelector((state) => state.user);

	const [chatSearchQuery, setChatSearchQuery] = useState("");

	const [recipient, setRecipient] = useState(null);
	const [messageContent, setMessageContent] = useState("");
	const [messages, setMessages] = useState([]);
	const [allDirectMessages, setAllDirectMessages] = useState([]);

	const [newMessageCount, setNewMessageCount] = useState(0);
	const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);

	const chatRef = useRef(null);

	const scrollToBottom = () => {
		console.log(chatRef.current);
		if (chatRef.current) {
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	};
	const handleScroll = () => {
		const { scrollTop, clientHeight, scrollHeight } = chatRef.current;
		setIsScrolledToBottom(
			scrollHeight - scrollTop <= clientHeight + (20 / 100) * clientHeight
		);
	};
	const handleScrollDown = () => {
		setIsScrolledToBottom(true);
		scrollToBottom();
		setNewMessageCount(0); // Reset new messages count
	};
	useEffect(() => {
		if (isScrolledToBottom) {
			setNewMessageCount(0); // Reset new messages count
			scrollToBottom();
		} else {
			setNewMessageCount(newMessageCount + 1); // Update new message count
		}
	}, [chat.allDirectMessages]);
	useEffect(() => {
		if (isScrolledToBottom) {
			setNewMessageCount(0); // Reset new messages count
			// scrollToBottom();
		}
	}, [isScrolledToBottom]);

	// Simulate receiving new messages
	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		const newMessage = {
	// 			timestamp: Date.now(),
	// 			content: `New message ${messages.length + 1}`,
	// 			sender: currentUser._id,
	// 			receiver: recipient._id,
	// 			read: false,
	// 		};
	// 		setMessages((prevMessages) => [...prevMessages, newMessage]);
	// 	}, 3000); // Every 3 seconds a new message is added

	// 	return () => clearInterval(interval);
	// }, [messages]);

	const [isFetching, setIsFetching] = useState(false);

	const [selectedChatId, setSelectedChatId] = useState("");

	const [staffList, setStaffList] = useState([]);
	const [activeChats, setActiveChats] = useState([...Array(0)]);

	const [searchData, setSearchData] = useState({
		conversation: [],
		staff: [],
		messages: [],
	});

	const handleSearchInput = (e) => {
		// setIsFetching(true);
		setChatSearchQuery(e.target.value);
	};

	const getStaffList = async () => {
		try {
			const res = await fetchInstance.get("/staffs/staff/all");
			setStaffList(res.data);
			console.log(res.data);
		} catch (e) {}
	};

	useEffect(() => {
		getStaffList();
		return () => {};
	}, []);

	const sendMessage = (e) => {
		e.preventDefault();
		console.log(messageContent);

		const message = {
			timestamp: Date.now(),
			content: messageContent,
			sender: currentUser._id,
			receiver: recipient._id,
			read: false,
		};
		socket.emit("directMessage", message);
		console.log("INSIDE CLIENT SEND MSSG");

		// setMessages((prev) => [...prev, { sender: currentUser._id, message }]);

    // setAllDirectMessages((prev) => [...prev, message]);

		dispatch(
      setChat({
        ...chat,
				allDirectMessages : [...chat.allDirectMessages, message],
			})
		);
    console.log(chat)

		setMessageContent("");
		// handleScrollDown();
	};
	const markAsRead = (message) => {
		socket.emit("messageRead", message);
	};

	// CREATE SEARCH FUNCTIONALITY WITH FUSE JS
	const options = {
		includeScore: true,
		includeMatches: true,
		threshold: 0.2,
		keys: [
			"firstName",
			"middleName",
			"lastName",
			"gender",
			"jobTitle",
			"position",
			"region.name",
			["office.name"],
		],
	};

	useEffect(() => {
		// console.log("DATA WHILE IN SEARCH", data);
		// If the user searched for an empty string,
		// display all data.
		if (chatSearchQuery.length === 0) {
			// setSearchResult(null);
			return;
		}

		// conversation query
		const fuse1 = new Fuse(activeChats, options);
		const results1 = fuse1.search(chatSearchQuery);
		const items1 = results1.map((result) => result.item);

		// staff query
		const fuse2 = new Fuse(staffList, options);
		const results2 = fuse2.search(chatSearchQuery);
		const items2 = results2.map((result) => result.item);

		// messages query
		const fuse3 = new Fuse(activeChats, options);
		const results3 = fuse3.search(chatSearchQuery);
		const items3 = results3.map((result) => result.item);

		// console.log("FUSE SEARCH: ", results);
		// console.log("FUSE SEARCH MAPPED: ", items);
		setSearchData({ conversation: items1, staff: items2, messages: items3 });
	}, [chatSearchQuery]);

	// const connectionStatus = () => {
	// 	return (
	// 		<div>
	// 			{socket.disconnected && <span>Reconnect</span>}
	// 			<div className={socket.connected ? "online" : "offline"}>
	// 				{socket.connected ? "Connected" : "Offline"}
	// 			</div>
	// 		</div>
	// 	);
	// };

	return (
		<>
			<Header />
			<div className="homeContainer">
				<SideBar />
				<div className="chat-background">
					<TopBar
						action={"Chats"}
						// planNumber={topBarData.planNumber}
						// lastPlanNo={topBarData.lastPlanNo}
						// options={connectionStatus()}
						style={{
							boxShadow:
								scroll > 0 ? "inset 0 8px 5px -5px rgb(0 0 0 / 0.4)" : "none",
							border: "1px solid #ccc",
						}}
					/>
					<div className="chat-main">
						<div className="chat-left">
							<div className="chat-left-top">
								<span className="searchBar">
									<label htmlFor="headerSearchInput">
										<Search className="searchIcon" />
									</label>
									<input
										id="headerSearchInput"
										type="text"
										placeholder="Search or start new chat"
										className="searchInput"
										onChange={(e) => handleSearchInput(e)}
										// onFocus={() => setOpen(true)}
										value={chatSearchQuery}
									/>
									{chatSearchQuery && (
										<div
											className="searchBarCloseButton"
											onClick={() => setChatSearchQuery("")}>
											{" "}
											<CloseRounded />
										</div>
									)}
								</span>

								<span className="new-chat">
									<AddRounded fontSize="20" />
								</span>
							</div>

							<div className="chat-list">
								{!chatSearchQuery && (
									<>
										{activeChats.map((e, i) => {
											return (
												<div onClick={() => setSelectedChatId(i + 1)}>
													<ChatListCard
														data={{ selectedId: selectedChatId, id: i + 1 }}
													/>
												</div>
											);
										})}

										{activeChats.length < 1 && (
											<div className="chat-empty">
												<h3>No Current Chat</h3>
												<p>Start a new conversation</p>
											</div>
										)}
									</>
								)}
								{chatSearchQuery && (
									<>
										<div>
											<span>Conversations</span>
											<div>
												<div onClick={() => setSelectedChatId(1)}>
													<ChatListCard
														data={{ selectedId: selectedChatId, id: 1 }}
													/>
												</div>
												<div onClick={() => setSelectedChatId(2)}>
													<ChatListCard
														data={{ selectedId: selectedChatId, id: 2 }}
													/>
												</div>
											</div>
										</div>
										<div>
											<span>Staff</span>
											<div className="chat-list">
												{searchData.staff.map((e) => {
													return (
														<div onClick={() => setRecipient(e)}>
															<StaffListCard data={{ user: e, recipient }} />
														</div>
													);
												})}
											</div>
										</div>
										<div>
											<span>Messages</span>
											<div>
												<div onClick={() => setSelectedChatId(1)}>
													<MessageListCard
														data={{ selectedId: selectedChatId, id: 1 }}
													/>
												</div>
												<div onClick={() => setSelectedChatId(2)}>
													<MessageListCard
														data={{ selectedId: selectedChatId, id: 2 }}
													/>
												</div>
											</div>
										</div>
									</>
								)}
							</div>
						</div>
						<div className="chat-right">
							<div className="chat-right-bg"></div>
							{!recipient && (
								<div className="chat-empty">
									<img src="/assets/chat/chat-new.svg" alt="" />
									<h2>Send Direct Messages to Staff</h2>

									<p>Select a chat or start a new conversation</p>
								</div>
							)}

							{recipient && (
								<>
									<div className="chat-header">
										<div className="info">
											<span className="avatar">
												<img
													src={
														recipient?.profilePicture
															? `${import.meta.env.VITE_STORAGE_LINK}${
																	recipient.profilePicture
															  }`
															: "/assets/persons/no_avatar.png"
													}
													alt=""
													srcSet=""
												/>
											</span>
											<div className="text">
												<span className="name">{recipient?.fullName}</span>
												<span className="message">Online</span>
											</div>
										</div>
									</div>

									<div className="chat-container-wrapper">
										<div
											className="chat-container"
											ref={chatRef}
											onScroll={handleScroll}>
											<Messages
												data={{
													allDirectMessages: chat.allDirectMessages,
													recipient,
												}}
											/>
											{!isScrolledToBottom && newMessageCount > 0 && (
												<span
													className="new-message-button"
													onClick={handleScrollDown}>
													New messages ({newMessageCount}) - Scroll Down
												</span>
											)}
											{!isScrolledToBottom && newMessageCount === 0 && (
												<span
													className="scroll-down-button"
													onClick={handleScrollDown}>
													↓ Scroll Down
												</span>
											)}
										</div>
									</div>

									<form className="message-sender" onSubmit={sendMessage}>
										<input
											type="text"
											placeholder="Type a message"
											value={messageContent}
											onChange={(e) => setMessageContent(e.target.value)}
										/>
										<button className="send-btn" type="submit">
											Send
										</button>
									</form>
								</>
							)}
						</div>
					</div>
				</div>
				{/* <FeedBackground></FeedBackground> */}
			</div>
		</>
	);
};

export default Chat;
