import { useDispatch, useSelector } from "react-redux";
import FeedBackground from "../../components/feedBackground/FeedBackground";
import FeedCard from "../../components/feedCard/FeedCard";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import { loginFailure, loginSuccess } from "../../redux/userSlice";
import CreateApplication from "../createApplication/CreateApplication";
import "./home.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
	const { currentUser, loading } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	const [reload, setReload] = useState();
	const [err, setErr] = useState(false);

	useEffect(() => {
		const getData = async () => {
			try {
				let host = import.meta.env.VITE_SERVER;
				const res = await axios.get(`${host}/staffs/staff`);

				setData(res.data);
				setIsLoading(false);
				console.log(res.data);
				dispatch(loginSuccess(res.data));

				console.log(res.data);
			} catch (error) {
				setIsLoading(false);
				setErr(true);
			}
		};

		getData();

		// return () => {
		// 	second
		// }
	}, [reload]);

	return (
		<>
			<div className="pageWrapper"></div>
			<Header />
			<div className="homeContainer">
				<SideBar />
				<div>
					<div className="home__greetings">Good Morning || John Doe</div>

					<FeedBackground>
						<div className="feedCard__container">
							<h2 className="feedCard__title">CLEARING HOUSE</h2>
							<div className="feedCard__list">
								<FeedCard
									count={24}
									priText={"Create New Application"}
									secText={"Clearing"}
									route={"/permit/new"}
								/>
								<FeedCard
									count={44}
									priText={"Payment made"}
									secText={"Assessment"}
								/>
								<FeedCard
									count={7}
									priText={"Minuted Files"}
									secText={"Assessment"}
								/>
								<FeedCard
									count={7}
									priText={"Minuted Files"}
									secText={"Assessment"}
								/>
								<FeedCard
									count={7}
									priText={"Minuted Files"}
									secText={"Assessment"}
								/>
							</div>
							<hr />
						</div>

						<div className="feedCard__container">
							<h2 className="feedCard__title">CLEARING HOUSE</h2>
							<div className="feedCard__list">
								<FeedCard
									count={24}
									priText={"Create New Application"}
									secText={"Clearing"}
									route={"/permit/new"}
								/>
								<FeedCard
									count={44}
									priText={"Payment made"}
									secText={"Assessment"}
								/>
								<FeedCard
									count={7}
									priText={"Minuted Files"}
									secText={"Assessment"}
								/>
								<FeedCard
									count={7}
									priText={"Minuted Files"}
									secText={"Assessment"}
								/>
							</div>
						</div>
						<hr />

						<div className="feedCard__container">
							<h2 className="feedCard__title">CLEARING HOUSE</h2>
							<div className="feedCard__list">
								<FeedCard
									count={24}
									priText={"Create New Application"}
									secText={"Clearing"}
									route={"/permit/new"}
								/>
								<FeedCard
									count={44}
									priText={"Payment made"}
									secText={"Assessment"}
								/>
								<FeedCard
									count={7}
									priText={"Minuted Files"}
									secText={"Assessment"}
								/>
							</div>
						</div>
						<div className="feedCard__container">
							<h2 className="feedCard__title">CLEARING HOUSE</h2>
							<div className="feedCard__list">
								<FeedCard
									count={24}
									priText={"Create New Application"}
									secText={"Clearing"}
									route={"/permit/new"}
								/>
								<FeedCard
									count={44}
									priText={"Payment made"}
									secText={"Assessment"}
								/>
								<FeedCard
									count={7}
									priText={"Minuted Files"}
									secText={"Assessment"}
								/>
							</div>
						</div>
						<div className="feedCard__container">
							<h2 className="feedCard__title">CLEARING HOUSE</h2>
							<div className="feedCard__list">
								<FeedCard
									count={24}
									priText={"Create New Application"}
									secText={"Clearing"}
									route={"/permit/new"}
								/>
								<FeedCard
									count={44}
									priText={"Payment made"}
									secText={"Assessment"}
								/>
								<FeedCard
									count={7}
									priText={"Minuted Files"}
									secText={"Assessment"}
								/>
							</div>
						</div>
					</FeedBackground>
				</div>
			</div>
		</>
	);
}
