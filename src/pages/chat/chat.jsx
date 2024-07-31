import React, { useState } from "react";
import "./chat.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import TopBar from "../../components/topBar/TopBar";
import { AddRounded, CloseRounded, Search } from "@mui/icons-material";
import { ChatListCard } from "./chatListCard";

const Chat = () => {
	const [chatSearchQuery, setChatSearchQuery] = useState("");
	const [searchData, setSearchData] = useState([]);
	const staff = null;
	const [isFetching, setIsFetching] = useState(false);

	const [selectedChatId, setSelectedChatId] = useState("");

	const handleSearchInput = (e) => {
		// setIsFetching(true);
		setChatSearchQuery(e.target.value);
	};

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
						// options={topBarData.options}
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
										onFocus={() => setOpen(true)}
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
								{/* <ChatListCard /> */}
								{[...Array(16)].map((e, i) => {
									return (
										<div onClick={() => setSelectedChatId(i + 1)}>
											<ChatListCard
												data={{ selectedId: selectedChatId, id: i + 1 }}
											/>
										</div>
									);
								})}
							</div>
						</div>
						<div className="chat-right">
							<div className="chat-right-bg"></div>
							{!selectedChatId && (
								<div className="chat-empty">
									<img src="/assets/chat/chat-new.svg" alt="" />
									<h2>Send Direct Messages to Staff</h2>

									<p>Select a chat or start a new conversation</p>
								</div>
							)}

							{selectedChatId && (
								<>
									<div className="chat-header">
										<div className="info">
											<span className="avatar">
												<img
													src={
														staff?.profilePicture
															? `${import.meta.env.VITE_STORAGE_LINK}${
																	staff.profilePicture
															  }`
															: "/assets/persons/no_avatar.png"
													}
													alt=""
													srcset=""
												/>
											</span>
											<div className="text">
												<span className="name">Orobosa Ikponmwosa</span>
												<span className="message">Online</span>
											</div>
										</div>
									</div>

									<div class="chat-container">
										<div class="message received">
											<div class="message-content">
												<p>Hello! How are you?</p>
												<span class="timestamp">10:00 AM</span>
											</div>
										</div>
										<div class="message sent">
											<div class="message-content">
												<p>
													I'm good, thanks! How about you? I'm good, thanks! How
													about you? I'm good, thanks! How about you? I'm good,
													thanks! How about you? I'm good, thanks! How about
													you? I'm good, thanks! How about you?
												</p>
												<span class="timestamp">10:01 AM</span>
											</div>
										</div>
										<div class="message received">
											<div class="message-content">
												<p>I'm doing well, thanks for asking!</p>
												<span class="timestamp">10:02 AM</span>
											</div>
										</div>
										<div class="message sent">
											<div class="message-content">
												<p>Great to hear!</p>
												<span class="timestamp">10:03 AM</span>
											</div>
										</div>
										<div class="message received">
											<div class="message-content">
												<p>Hello! How are you?</p>
												<span class="timestamp">10:00 AM</span>
											</div>
										</div>
										<div class="message sent">
											<div class="message-content">
												<p>I'm good, thanks! How about you?</p>
												<span class="timestamp">10:01 AM</span>
											</div>
										</div>
										<div class="message received">
											<div class="message-content">
												<p>I'm doing well, thanks for asking!</p>
												<span class="timestamp">10:02 AM</span>
											</div>
										</div>
										<div class="message sent">
											<div class="message-content">
												<p>Great to hear!</p>
												<span class="timestamp">10:03 AM</span>
											</div>
										</div>
										<div class="message received">
											<div class="message-content">
												<p>Hello! How are you?</p>
												<span class="timestamp">10:00 AM</span>
											</div>
										</div>
										<div class="message sent">
											<div class="message-content">
												<p>I'm good, thanks! How about you?</p>
												<span class="timestamp">10:01 AM</span>
											</div>
										</div>
										<div class="message received">
											<div class="message-content">
												<p>I'm doing well, thanks for asking!</p>
												<span class="timestamp">10:02 AM</span>
											</div>
										</div>
										<div class="message sent">
											<div class="message-content">
												<p>Great to hear!</p>
												<span class="timestamp">10:03 AM</span>
											</div>
										</div>
									</div>

									<div className="message-sender">
										<input type="text" placeholder="Type a message" />
										<span className="send-btn">Send</span>
									</div>
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
