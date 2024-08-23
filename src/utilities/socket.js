import io from "socket.io-client";

export const socket = io(import.meta.env.VITE_SERVER_PLAIN, {
	autoConnect: false,
}); // Replace with your server address

socket.onAny((event, ...args) => {
	// console.log(event, args);
});

// export const connectSocket = async () => {
// 	socket.on("connection", () => {
// 		console.log(`I'm connected with the back-end`);
// 		// socket.emit("connection", null);
// 	});
// };

// export const disconnectSocket = async () => {
// 	socket.off("message");
// };

export const allDirectMessages = (message) => {
	let list = [];

	const add = () => {
		list.push(message);
	};

	return {
		add,
		list,
	};
};
