import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import TopBar from "../../components/topBar/TopBar";
import {
	AddRounded,
	CloseRounded,
	EmojiEmotionsRounded,
	Search,
} from "@mui/icons-material";
import { ChatListCard } from "./chatListCard";
import { StaffListCard } from "./staffListCard";
import { MessageListCard } from "./MessageListCard";
import Fuse from "fuse.js";
import { fetchInstance } from "../../utilities/fetcher";
import { useDispatch, useSelector } from "react-redux";
import { Messages } from "./messages";
import { socket } from "../../utilities/socket";
import {
	addMessage,
	setActiveList,
	setChat,
	setChatList,
	setTotalUnreadCount,
} from "../../redux/userSlice";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const Chat = () => {
	const dispatch = useDispatch();
	const { currentUser, chat } = useSelector((state) => state.user);

	const [chatSearchQuery, setChatSearchQuery] = useState("");

	const [recipient, setRecipient] = useState(null);
	const [recipientData, setRecipientData] = useState(null);
	const [messageContent, setMessageContent] = useState("");
	const [allDirectMessages, setAllDirectMessages] = useState([]);

	const [newMessageCount, setNewMessageCount] = useState(0);
	const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);

	const [showEmojis, setShowEmojis] = useState(false);
	const sendSound = new Audio("/assets/sound/sent.mp3");

	const chatRef = useRef(null);

	const [isFetching, setIsFetching] = useState(false);

	const [selectedChatId, setSelectedChatId] = useState("");

	const [staffList, setStaffList] = useState([]);
	const [activeChats, setActiveChats] = useState({});

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

		const newActiveChats = getActiveChats(
			chat.allDirectMessages,
			currentUser._id
		);

		const totalUnreadCount = Object.values(newActiveChats).reduce(
			(acc, chat) => acc + chat.unread,
			0
		);
		// setActiveChats(newActiveChats);
		dispatch(setTotalUnreadCount(totalUnreadCount));
		dispatch(setChatList(newActiveChats));
	}, [chat.allDirectMessages]);

	useEffect(() => {
		if (isScrolledToBottom) {
			setNewMessageCount(0); // Reset new messages count
			// scrollToBottom();
		}
	}, [isScrolledToBottom]);

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
			setIsFetching(true);
			const res = await fetchInstance.get("/staffs/staff/all");
			setStaffList(res.data);
			console.log(res.data);
		} catch (e) {
		} finally {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		const staff = staffList.filter((s) => s._id === recipient);
		setRecipientData(staff[0]);

		return () => {};
	}, [recipient]);

	useEffect(() => {
		getStaffList();
		return () => {};
	}, []);

	const sendMessage = (e) => {
		e.preventDefault();
		console.log(messageContent);
		setShowEmojis(false);

		const message = {
			timestamp: Date.now(),
			content: messageContent,
			sender: currentUser._id,
			receiver: recipient,
			delivered: false,
			read: false,
		};
		socket.emit("directMessage", message);
		console.log("INSIDE CLIENT SEND MSSG");

		console.log(chat);
		console.log(message);
		dispatch(addMessage(message));
		sendSound.play();
		console.log(chat);

		setMessageContent("");
		// handleScrollDown();
	};
	const markAsRead = (message) => {
		socket.emit("messageRead", message);
	};

	const handleTyping = () => {
		socket.emit("typing", { receiver: recipient, sender: currentUser._id });
	};

	function getActiveChats(messages, currentUserId) {
		// Filter out messages where the current user is not the sender or receiver
		const filteredMessages = messages.filter(
			(msg) => msg.sender === currentUserId || msg.receiver === currentUserId
		);

		// Create a dictionary to store the latest message for each user
		const latestMessages = {};

		// Iterate over the filtered messages
		filteredMessages.forEach((msg) => {
			// Get the user ID (either sender or receiver)
			const userId = msg.sender === currentUserId ? msg.receiver : msg.sender;

			// If the user ID is not in the dictionary or the current message is newer
			if (
				!latestMessages[userId] ||
				msg.timestamp > latestMessages[userId].message.timestamp
			) {
				// Update the dictionary with the latest message
				latestMessages[userId] = {
					message: { ...msg },
					unread: filteredMessages.filter(
						(m) =>
							m.sender === userId && m.receiver === currentUserId && !m.read
					).length,
				};
			}
		});

		// Sort the messages by timestamp
		const sortedMessages = Object.keys(latestMessages)
			.sort(
				(a, b) =>
					latestMessages[b].message.timestamp -
					latestMessages[a].message.timestamp
			)
			.reduce((acc, key) => {
				acc[key] = latestMessages[key];
				return acc;
			}, {});

		return sortedMessages;
	}

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
		const fuse1 = new Fuse(chat.chatList, options);
		const results1 = fuse1.search(chatSearchQuery);
		const items1 = results1.map((result) => result.item);

		// staff query
		const fuse2 = new Fuse(staffList, options);
		const results2 = fuse2.search(chatSearchQuery);
		const items2 = results2.map((result) => result.item);

		// messages query
		const fuse3 = new Fuse(chat.chatList, options);
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
						// options={chat.typingList.includes(recipient) && "WATTTT"}
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
								{!isFetching ? (
									<>
										{!chatSearchQuery && (
											<>
												{Object.keys(chat.chatList).map((e, i) => {
													return (
														<div onClick={() => setRecipient(e)}>
															<ChatListCard
																data={{
																	staff: staffList.filter(
																		(s) => s._id === e
																	)[0],
																	chat: chat.chatList[e],
																	activeList: chat.activeList,
																	recipient,
																	isTyping: chat.typingList.includes(e),
																}}
															/>
														</div>
													);
												})}

												{Object.keys(chat.chatList)?.length < 1 && (
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
															{/* <ChatListCard
														data={{
															selectedId: selectedChatId,
															id: 1,
															activeList: chat.activeList,
														}}
													/> */}
														</div>
													</div>
												</div>
												<div>
													<span>Staff</span>
													<div className="chat-list">
														{searchData.staff.map((e) => {
															return (
																<div
																	onClick={() => {
																		setRecipient(e._id);
																		setRecipientData(e);
																	}}>
																	<StaffListCard
																		data={{
																			staff: [e],

																			activeList: chat.activeList,
																			recipient,
																		}}
																	/>
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
									</>
								) : (
									<div className="chat-empty">
										<div className="typing received">
											<div className="message-content">
												<span></span>
												<span></span>
												<span></span>
											</div>
										</div>
									</div>
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

							{recipient && recipientData && (
								<>
									<div className="chat-header">
										<div className="info">
											<span className="avatar">
												<img
													src={
														recipientData?.profilePicture
															? `${import.meta.env.VITE_STORAGE_LINK}${
																	recipientData.profilePicture
															  }`
															: "/assets/persons/no_avatar.png"
													}
													alt=""
													srcSet=""
												/>
											</span>
											<div className="text">
												<span className="name">{recipientData?.fullName}</span>
												<span className="message">
													{recipientData?._id in chat.activeList && "Online"}
												</span>
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
													isTyping: chat.typingList.includes(recipient),
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
											onChange={(e) => {
												console.log(recipient);
												handleTyping();
												setMessageContent(e.target.value);
											}}
										/>
										<EmojiEmotionsRounded
											className="emoji-picker-icon"
											onClick={() => setShowEmojis(!showEmojis)}
										/>

										{showEmojis && (
											<div className="emoji-picker">
												<Picker
													data={data}
													// onClickOutside={setShowEmojis(false)}
													onEmojiSelect={(e) => {
														setMessageContent((prev) => prev + e.native);
													}}
												/>
											</div>
										)}

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
