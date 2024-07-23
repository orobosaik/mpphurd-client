import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./animatedBackground.css";

const images = [
	"/assets/banners/bg2.jpg",
	"/assets/banners/bg3.jpg",
	"/assets/banners/bg4.jpg",
	"/assets/banners/bg5.jpg",
	"/assets/banners/bg6.jpg",
	"/assets/banners/bg.jpg",
	"/assets/banners/bg1.jpg",
	"/assets/banners/bg7.jpg",
	"/assets/banners/bg8.jpg",
];

const transition = {
	duration: 5,
	ease: "linear",
	loop: Infinity,
};

const AnimatedBackground = () => {
	const [toggle, setToggle] = useState(false);
	const [currentImageIdx, setCurrentImageIdx] = useState(0);

	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setIsTransitioning(true);

			setCurrentImageIdx((prevIndex) => (prevIndex + 1) % images.length);
		}, 10000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<>
			{/* {images.map((image, index) => (
				// <motion.div
				// 	key={index}
				// 	className=""
				// 	initial={
				// 		isEven
				// 			? { opacity: 0, scale: 1.5, x: "-50%", y: "-50%" }
				// 			: { opacity: 0, scale: .5, x: "50%", y: "50%" }
				// 	}
				// 	animate={
				// 		isEven
				// 			? { opacity: 1, scale: 1, x: "0%", y: "0%" }
				// 			: { opacity: 1, scale: 1, x: "0%", y: "0%" }
				// 	}
				// 	exit={
				// 		isEven
				// 			? { opacity: 0, scale: 1.5, x: "50%", y: "50%" }
				// 			: { opacity: 0, scale: .5, x: "-50%", y: "-50%" }
				// 	}
				// 	// transition={transition}
				// 	style={{
				// 		position: "fixed",
				// 		top: 0,
				// 		left: 0,
				// 		width: "100vw",
				// 		height: "100vh",
				// 		backgroundImage: `url(${images[currentImageIdx]})`,
				// 		backgroundSize: "cover",
				// 		backgroundPosition: "top",
				// 		transition: "background-image 5s linear", // Add transition for background image
				// 		zIndex: "-10",
				// 		backgroundRepeat: "repeat",
				// 	}}></motion.div>
				<motion.div
					key={index}
					className=""
					style={{
						backgroundImage: `url(${images[currentImageIdx]})`,
						backgroundSize: "cover",
						zIndex: "-10",
						width: "100vw",
						height: "100vh",
						animation: `zoomAndPan 20s infinite`, // Apply the zoom and pan animation
					}}></motion.div>
			))} */}

			{images.map((image, index) => {
				return (
					<div
						key={index}
						className={`animatedBg ${isTransitioning && ""}`}
						style={{
							backgroundImage: `url(${image})`,
							opacity: index === currentImageIdx ? 1 : 0,
							transition: "opacity 3s", // Fade effect duration
						}}></div>
				);
			})}
		</>
	);
};

export default AnimatedBackground;
